import json
from uuid import uuid4

from typing import Annotated
from fastapi.responses import JSONResponse
from fastapi import Depends, HTTPException, APIRouter

from app.models import user
from passlib.context import CryptContext

from app.variables.paths import users_file
from app.services.auth_service import AuthService

router = APIRouter()
auth_service = AuthService()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


@router.post("/register")
async def register(new_user: user.LoginUser):
    users = auth_service.get_users()
    emails = set(map(lambda x: x["email"], users.values())) if users else set()

    if new_user.email in emails:
        raise HTTPException(400, f"Email already in use !")

    hashed_pwd = pwd_context.hash(new_user.password)
    id = str(uuid4())

    user = {"id": id, **new_user.model_dump(), "password": hashed_pwd}
    users[id] = user

    try:
        with open(users_file, "w") as f:
            json.dump(users, f)
            user_data = {k: v for k, v in user.items() if k != "password"}

            token = auth_service.create_access_token(user_data)
            return JSONResponse(user_data, 201, {"x-auth-token": token})

    except (PermissionError):
        raise HTTPException(
            500, f"Unable to create users file !")

    except Exception as ex:
        raise HTTPException(500, f"An unexpected error occurred !. {str(ex)}")

#


@router.post("/login")
async def login(user: user.LoginUser):
    users = auth_service.get_users()
    emails = set(map(lambda x: x["email"], users.values())) or set()

    if not user.email in emails:
        raise HTTPException(400, "Unknown user. Please register first !")

    user_obj = next((x for x in users.values()
                    if x["email"] == user.email), None)

    is_pwd_valid = pwd_context.verify(user.password, user_obj["password"])
    if not is_pwd_valid:
        raise HTTPException(403, "Invalid Password !")

    user_data = {k: v for k, v in user_obj.items() if k != "password"}

    token = auth_service.create_access_token(user_data)
    return JSONResponse(user_data, 200, {"x-auth-token": token})


@router.get("/profile")
async def get_profile(token: Annotated[str, Depends(auth_service.decode_access_token)]):
    users = auth_service.get_users()

    try:
        user_id = token["id"]

    except KeyError:
        raise HTTPException(401, "Unauthorized user. Missing attributes !")

    if not user_id in users:
        raise HTTPException(
            404, "You are not a part of our community !")

    return users[user_id]
