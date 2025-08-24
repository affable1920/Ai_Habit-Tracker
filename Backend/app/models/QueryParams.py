from pydantic import BaseModel, Field


class QueryParameters(BaseModel):
    status: str | None = None
    searchQuery: str | None = None
    max: int = Field(gt=0, default=10)
    page: int = Field(gt=0, default=1)
