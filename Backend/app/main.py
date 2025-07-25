import asyncio
from datetime import datetime
from contextlib import asynccontextmanager

from fastapi import FastAPI, status
from fastapi import WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

from app.routes import auth
from app.routes import habits
from app.scripts.path_scripts import init_dirs_and_paths
from app.services.auth_service import decode_access_token, get_users

origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://aihabittracker-one.vercel.app",
]


@asynccontextmanager
async def root(app: FastAPI):
    print("App is starting up !")
    init_dirs_and_paths()

    yield
    print("App is shutting down !")


app = FastAPI(lifespan=root)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
    expose_headers=["x-auth-token", "x-session-exp", "x-websocket-disconnect"],
)


app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(habits.router, prefix="/habits", tags=["Habit_CRUD"])


async def broadcase_msgs(msg: str):
    pass


@app.get("/healthz")
def health_check():
    return {"message": "The app is working fine ."}


ws_conns: dict[str, WebSocket] = {}

MUST_EXIT = {"code": status.WS_1010_MANDATORY_EXT, "reason": "SESSION_EXPIRE"}
NO_AUTH = {"code": status.WS_1008_POLICY_VIOLATION,
           "reason": "NOT_AUTHENTICATED"}


@app.websocket("/ws")
async def ws(websocket: WebSocket):
    token = websocket.headers.get('sec-websocket-protocol')

    if not token:
        await websocket.close(**NO_AUTH)
        return

    try:
        user = decode_access_token(token)
        user_id, exp = user.get('id'), user.get("exp")

    except Exception:
        await websocket.close(**NO_AUTH)
        return

    if not user_id or user_id not in get_users():
        await websocket.close(**NO_AUTH)
        return

    exp_timestamp = datetime.fromtimestamp(exp) - datetime.now()
    time_left = exp_timestamp.total_seconds()

    if time_left <= 0:
        await websocket.close(**MUST_EXIT)
        return

    async def schedule_logout(u_id, delay):
        await asyncio.sleep(delay)
        await websocket.close(**MUST_EXIT)

        if u_id in ws_conns:
            del ws_conns[u_id]

    await websocket.accept(subprotocol=token)
    asyncio.create_task(schedule_logout(user_id, time_left))

    ws_conns[user_id] = websocket
    try:
        while True:
            rqst = await websocket.receive()
            print(rqst)

            await websocket.send_json("Hello")

    except WebSocketDisconnect:
        if user_id in ws_conns:
            del ws_conns[user_id]
        return
