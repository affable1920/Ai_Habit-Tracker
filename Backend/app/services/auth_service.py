from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer

from typing import Annotated
from datetime import datetime, timedelta, timezone

import os
import jwt
import json

from app.variables.paths import users_file
from dotenv import load_dotenv

ALG = "HS256"
load_dotenv()

S_KEY = os.getenv("JWT_SECRET_KEY")
auth_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_users():
    if not users_file.exists() or users_file.stat().st_size == 0:
        with open(users_file, "w") as f:
            json.dump({}, f)

        return {}

    try:
        with open(users_file, "r") as f:
            return json.load(f)

    except json.JSONDecodeError:
        return {}


def create_access_token(user_data):
    now = datetime.now(timezone.utc)

    iat = now.timestamp()
    exp = (now + timedelta(seconds=6)).timestamp()

    payload = {**user_data, "iat": iat, "exp": exp}
    return jwt.encode(payload, S_KEY, ALG)


def decode_access_token(token: Annotated[str, Depends(auth_scheme)]):
    try:
        return jwt.decode(token, S_KEY, [ALG])

    except jwt.ExpiredSignatureError:
        raise HTTPException(
            403, "Session expired. Please log in again !", {
                "x-session-exp": "true"}
        )

    except jwt.InvalidTokenError as e:
        print(e)
        raise HTTPException(403, "Unauthorized. Invalid token recieved !")
