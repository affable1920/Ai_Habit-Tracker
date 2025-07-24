from pydantic import BaseModel


class ResponseModel(BaseModel):
    status: int = 200
    success: bool = True
    msg: str | None = None
    data: dict | None = None
    details: dict | None = None


class ErrResponse(ResponseModel):
    msg: str = "Not Authenticated. Please login first or register."
    status: int = 403
    success: bool = False
    error: dict | None = None
