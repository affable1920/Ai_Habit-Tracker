from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.auth import router as auth
from routes.habits import router as habits

app = FastAPI()

origins = ["http://localhost:5173", "http://localhost:5174"]
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
