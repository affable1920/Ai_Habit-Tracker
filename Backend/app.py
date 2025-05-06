import os
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from contextlib import asynccontextmanager


import uvicorn
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger

from routes.auth import router as auth
from routes.habits import router as habits

from scripts.path_scripts import init_dirs
from services.Habit_Services.batch_ops import BatchOps
import logging


app = FastAPI()
scheduler = AsyncIOScheduler()

logger = logging.getLogger("app")
logging.basicConfig(
    level=logging.INFO,
    handlers=[logging.StreamHandler(), logging.FileHandler("app_logs")],
)

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


@asynccontextmanager
async def startup():
    pass


@app.on_event("startup")
async def startup():
    init_dirs()
    ops = BatchOps()

    scheduler.add_job(
        ops.update_streak,
        CronTrigger(hour=0, minute=0, second=0),
        id="update_streak",
        replace_existing=True,
    )

    ops.correct_habits()

    scheduler.add_job(
        ops.correct_habits, CronTrigger(hour=0, minute=0), id="correct_habits"
    )

    scheduler.start()


if __name__ == "__main__":
    PORT = int(os.getenv("PORT", 8000))
    uvicorn.run(app="app:app", host="0.0.0.0", port=PORT)
