import asyncio
from datetime import datetime
from contextlib import asynccontextmanager

from fastapi import FastAPI, status
from fastapi import WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

# Custom modules.
from app.routes import auth
from app.routes import habits
from app.conn.websocket import WSManager
from app.services.auth_service import AuthService
from app.scripts.path_scripts import init_dirs_and_paths

origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://aihabittracker-one.vercel.app",
]


@asynccontextmanager
# The context manager returned here is then passed to the FastAPI's lifespan parameter.
async def root(app: FastAPI):
    # At start
    print("App is starting up !")
    try:
        init_dirs_and_paths()

    except PermissionError as ex:
        print(ex)

    # yield seperates app startup from shutdown
    yield

    # The code below runs when our app stops.
    print("App is shutting down !")


app = FastAPI(lifespan=root)
auth_service = AuthService()


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
    expose_headers=["x-auth-token",
                    "x-session-expire", "x-websocket-disconnect"],
)


app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(habits.router, prefix="/habits", tags=["Habit_CRUD"])


@app.get("/healthz")
def health_check():
    return {"message": "The app is working fine ."}


MUST_EXIT = {"code": status.WS_1010_MANDATORY_EXT, "reason": "SESSION_EXPIRE"}
NO_AUTH = {"code": status.WS_1008_POLICY_VIOLATION,
           "reason": "NOT_AUTHENTICATED"}
INVALID_TOKEN = {"code": status.WS_1008_POLICY_VIOLATION,
                 "reason": "INVALID_TOKEN"}

ws_manager = WSManager()


async def schedule_logout(u_id, delay):
    return
    await asyncio.sleep(delay)
    await ws_manager.disconnect(u_id, MUST_EXIT)


def validate_token(token: str):
    return
    try:
        user = auth_service.decode_access_token(token)

        if not user:
            return None

        try:
            user_id, exp = user.get('id'), user.get("exp")
            if not user_id or not exp or user_id not in auth_service.get_users():
                return None

        except Exception:
            return None

        exp_timestamp = datetime.fromtimestamp(exp) - datetime.now()
        time_left = exp_timestamp.total_seconds()

        if time_left <= 0:
            return None

        return {"user_id": user_id, "time_left": time_left}

    except Exception as ex:
        print(ex)
        return None


@app.websocket("/ws")
async def ws(websocket: WebSocket):
    return
    token = websocket.query_params.get("token", None)

    if not token:
        await websocket.close(**NO_AUTH)
        return

    user_data = validate_token(token)
    user_id, time_left = (user_data["user_id"], user_data["time_left"])

    await ws_manager.connect(ws_id=user_id, ws=websocket)
    exp_event = asyncio.create_task(schedule_logout(user_id, time_left))

    try:
        await ws_manager.broadcast(subscribers=[user_id], msg="MUST_EXIT")
        # await ws_manager.send_msg(ws_id=user_id, msg="Hey buddy!")

    except WebSocketDisconnect:
        await ws_manager.disconnect(user_id, MUST_EXIT)
        exp_event.cancel()
        return
