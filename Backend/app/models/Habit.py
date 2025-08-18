from typing import Optional
from uuid import uuid4
from pydantic import BaseModel, Field
from datetime import datetime


class Query(BaseModel):
    page: int = Field(gt=0, default=1)
    searchQuery: Optional[str] = ""
    status: Optional[bool] = None
    max: int = Field(default=10, gt=0)


class Defaults(BaseModel):
    id: str = Field(..., default_factory=lambda: str(uuid4()))
    created_at: str = Field(default=datetime.now().isoformat())

    streak: int = 0
    status: str = "incomplete"

    completed: bool = False
    archived: bool = False

    last_completed: Optional[int | str] = None

    progress: list = []
    reminder_times: list = []
    completion_log: list = []


class ClientData(BaseModel):
    title: str = Field(...)
    description: Optional[str] = None

    category: Optional[str] = None
    priority: Optional[str | int] = None
    frequency: Optional[str] = None

    interval: Optional[int | str] = None
    interval_time: Optional[str] = None


class Habit(Defaults, ClientData):
    pass


class UpdateHabit(BaseModel):
    title: Optional[str] = None
    status: Optional[str] = None

    priority: Optional[int] = None
    description: Optional[str] = None

    archived: Optional[bool] = None
    completed: Optional[bool] = None
    reminder_times: Optional[list] = None


class MarkCompleteHabit(BaseModel):
    completed: bool
