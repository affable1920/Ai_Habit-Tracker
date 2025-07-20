from typing import Any
from pydantic import BaseModel


class Response(BaseModel):
    msg: str | None = None
    status: int = 200
    success: bool = True
    data: dict[str, Any] | None = None
    details: dict[str, Any] | None = None


class ErrResponse(Response):
    status = 400
    success = False
    error: dict[str | Any] | None = None
