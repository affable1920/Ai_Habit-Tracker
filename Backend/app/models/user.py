from pydantic import BaseModel, EmailStr


class CreateUser(BaseModel):
    email: EmailStr
    password: str
    username: str


class LoginUser(BaseModel):
    email: EmailStr
    password: str
