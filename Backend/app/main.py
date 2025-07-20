import jwt

from contextlib import asynccontextmanager

from fastapi.websockets import WebSocketState
from fastapi.middleware.cors import CORSMiddleware

from fastapi import FastAPI
from fastapi import WebSocket, WebSocketDisconnect


from app.routes import auth
from app.routes import habits
from app.services.auth_service import decode_access_token, get_users

from app.scripts.path_scripts import init_dirs_and_paths


origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://default-jade.vercel.app",
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


ws_conns: dict = {}


async def ws_close(
    websocket,
    status: int,
    err_msg: str,
    u_id: str | None = None,
):
    if websocket.application_state != WebSocketState.DISCONNECTED:
        # await websocket.send_json()
        await websocket.close(status, err_msg, {"x-websocket-disconnect": "true"})

    if u_id in ws_conns:
        ws_conns.pop(u_id)


@app.websocket("/ws")
async def ws(websocket: WebSocket):
    token = websocket.headers.get("sec-websocket-protocol", None)

    if not token:
        websocket.send_denial_response(
            "Who are you ? Login first or register !")
        await websocket.close(1007, "Not Authenticated")

    try:
        user = decode_access_token(token)

    except jwt.InvalidTokenError:
        await ws_close(websocket, 1008, "Invalid token Please log in again!")

    except jwt.ExpiredSignatureError:
        await ws_close(websocket, 1008, "Session expired. Please log in again !")

    user_id = user.get("id")

    if not user_id or user_id not in get_users():
        websocket.send_denial_response(
            "You must be a registered user to access this resource."
        )
        await ws_close(websocket, 1008)
        return

    await websocket.accept(subprotocol=token)
    ws_conns[user_id] = websocket

    while True:
        try:
            usr_rqst = await websocket.receive_text()
            await websocket.send_text("Hello from server")

        except WebSocketDisconnect:
            if user_id in ws_conns:
                ws_conns.pop(user_id)
            return
