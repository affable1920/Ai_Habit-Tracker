from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer

from typing import Annotated
from datetime import datetime, timedelta

import jwt
import json

from variables.paths import USERS_FILE


ALG = "HS256"

auth_scheme = OAuth2PasswordBearer(tokenUrl="token")
SECRET_KEY = "03bfa121b4b2b237f7675488cc51bc0879b5b3d21b31dbf163c25a791289f553"


def get_users():
    if not USERS_FILE.exists() or not USERS_FILE.read_text():
        with open(USERS_FILE, "w") as f:
            json.dump({}, f)

        return {}

    try:
        with open(USERS_FILE, "r") as f:
            return json.load(f)

    except json.JSONDecodeError:
        return {}


def create_access_token(user_data):
    iat = datetime.now().timestamp()
    exp = (datetime.now() + timedelta(hours=1)).timestamp()

    payload = {**user_data, "iat": iat, "exp": exp}
    return jwt.encode(payload, SECRET_KEY, ALG)


def decode_access_token(token: Annotated[str, Depends(auth_scheme)]):
    try:
        return jwt.decode(token, SECRET_KEY, [ALG])

    except jwt.ExpiredSignatureError:
        raise HTTPException(
            403, "Session expired. Please log in again !", {"SESSION_EXP": "true"}
        )

    except jwt.InvalidTokenError:
        raise HTTPException(403, "Unauthorized. Invalid token recieved !")
