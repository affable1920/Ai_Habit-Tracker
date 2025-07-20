import json
from uuid import uuid4

from typing import Annotated
from fastapi.responses import JSONResponse
from fastapi import Depends, HTTPException, APIRouter

from app.models import user
from passlib.context import CryptContext


from app.variables.paths import users_file
import app.services.auth_service as auth_service

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


@router.post("/register")
async def register(new_user: user.CreateUser):
    users = auth_service.get_users()

    emails = set(map(lambda x: x["email"], users.values())) if users else set()

    if new_user.email in emails:
        raise HTTPException(400, f"User already registered !")

    hashed_pwd = pwd_context.hash(new_user.password)
    id = str(uuid4())

    user = {"id": id, **new_user.model_dump(), "password": hashed_pwd}
    users[user["id"]] = user

    try:
        with open(users_file, "w") as f:
            json.dump(users, f)

            user_data = {k: v for k, v in user.items() if k != "password"}
            token = auth_service.create_access_token(user_data)

            return JSONResponse(user_data, 201, {"x-auth-token": token})

    except json.JSONDecodeError:
        raise HTTPException(500, "An internal server error occurred !")


@router.post("/login")
async def login(user: user.LoginUser):
    users = auth_service.get_users()
    emails = set(map(lambda x: x["email"], users.values())) if users else set()

    if not user.email in emails:
        raise HTTPException(400, "User not found. Please register first !")

    user_obj = next((x for x in users.values()
                    if x["email"] == user.email), None)

    pwd_valid = pwd_context.verify(user.password, user_obj["password"])
    if not pwd_valid:
        raise HTTPException(401, "Invalid Password !")

    user_data = {k: v for k, v in user_obj.items() if k != "password"}
    return auth_service.create_access_token(user_data)


@router.get("/profile")
async def get_profile(token: Annotated[str, Depends(auth_service.decode_access_token)]):
    users = auth_service.get_users()
    user_id = token["id"]

    if not user_id in users:
        raise HTTPException(
            404, "You are not a part of our community so FUCK OFF !")

    return users[user_id]
