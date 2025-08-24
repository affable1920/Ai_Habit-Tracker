from pydantic import BaseModel, EmailStr


class UserInDB(BaseModel):
    id: str
    password: str
    username: str
    email: EmailStr


class LoginUser(BaseModel):
    email: EmailStr
    password: str
