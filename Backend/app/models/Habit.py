from uuid import uuid4
from datetime import datetime
from pydantic import BaseModel, Field


class HabitDefaults(BaseModel):
    id: str = Field(..., default_factory=lambda: str(uuid4()))
    created_at: str = Field(default=datetime.now().isoformat())

    streak: int = 0
    status: str = "incomplete"

    archived: bool = False
    completed: bool = False

    progress: list | None = None
    reminder_times: list | None = None
    completion_log: list | None = None
    last_completed: int | str | None = None


class HabitClientSide(BaseModel):
    title: str = Field(...)
    description: str | None = None

    category: str | None = None
    frequency: str | None = None

    interval_time: str | None = None
    interval: int | str | None = None
    priority: int | str | None = None


class FullHabit(HabitDefaults, HabitClientSide):
    pass


class UpdateHabit(BaseModel):
    title: str | None = None
    status: str | None = None

    description: str | None = None
    priority: int = Field(gt=0)

    archived: bool | None = False
    reminder_times: list[str | int] = []


class MarkCompleteHabit(BaseModel):
    completed: bool
