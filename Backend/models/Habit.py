from typing import Optional
from uuid import uuid4
from pydantic import BaseModel, Field
from datetime import datetime


class Query(BaseModel):
    page: int = Field(1, gt=0)
    search_query: str = Field("")
    status: bool = Field(None)
    max: int = Field(0)


class FE_Data(BaseModel):
    title: str
    description: Optional[str] = None

    category: Optional[str] = None
    priority: Optional[str | int] = None
    frequency: Optional[str] = None

    interval: Optional[int | str] = None
    interval_time: Optional[str] = None


class Defaults(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid4()))
    created_at: str = Field(default_factory=lambda: datetime.now().isoformat())

    streak: int = 0
    status: str = "incomplete"

    completed: bool = False
    archived: bool = False
    last_completed: str = Field(default_factory=lambda: None)

    progress: list = []
    reminder_times: list = []
    completion_log: list = []


class EnableUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    completed: Optional[bool] = None


class Habit(FE_Data, Defaults):
    pass
