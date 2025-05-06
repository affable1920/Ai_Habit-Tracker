import os
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from contextlib import asynccontextmanager


import uvicorn
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger

from routes.habits import router as habits
from routes.auth import router as auth

from scripts.path_scripts import init_dirs
from services.Habit_Services.batch_ops import BatchOps
import logging


logging.basicConfig(
    level=logging.DEBUG,
    handlers=[logging.StreamHandler()],
)


logger = logging.getLogger(__name__)
scheduler = AsyncIOScheduler()


@asynccontextmanager
async def root(app: FastAPI):
    print("App is starting up !")
    init_dirs()
    batch_ops = BatchOps()

    scheduler.add_job(
        batch_ops.update_streak,
        CronTrigger(hours=0, minutes=0, seconds=0),
        id="streak_update",
        replace_existing=True,
    )

    scheduler.start()

    yield
    print("App is shutting down !")


app = FastAPI(lifespan=root)


origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "ai-habit-tracker-one.vercel.app",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
    expose_headers=["x-auth-token", "SESSION_EXP"],
)


app.include_router(auth, prefix="/auth", tags=["Authentication"])
app.include_router(habits, prefix="/habits", tags=["Habit_CRUD"])

active_ws_conns = []


async def broadcase_msgs(msg: str):
    for conn in active_ws_conns:
        try:
            await conn.send_text(msg)

        except (WebSocketDisconnect, Exception) as e:
            print(e)


@app.websocket("/ws")
async def ws(websocket: WebSocket):
    await websocket.accept()
    active_ws_conns.append(websocket)

    try:
        while True:
            data = await websocket.receive_text()
            for conn in active_ws_conns:
                await conn.send_text(data)

    except WebSocketDisconnect:
        active_ws_conns.remove(websocket)

    except Exception as e:
        active_ws_conns.remove(websocket)
        print(e)


@app.get("/healthz")
def health_check():
    return {"message": "The app is working fine ."}


if __name__ == "__main__":
    PORT = int(os.getenv("PORT", 8000))
    uvicorn.run(app="app:app", host="0.0.0.0", port=PORT)
