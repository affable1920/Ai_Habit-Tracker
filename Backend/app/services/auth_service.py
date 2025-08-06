from anyio import Path
from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer

from typing import Annotated
from datetime import datetime, timedelta

import os
import jwt
import json

from dotenv import load_dotenv
from app.variables.paths import users_file


ALG = "HS256"
load_dotenv()

S_KEY = os.getenv("JWT_SECRET_KEY")
auth_scheme = OAuth2PasswordBearer(tokenUrl="token")


class AuthService():
    _file: Path = users_file
    _def_exp = timedelta(weeks=4)

    @classmethod
    def mkfile(cls):
        if not cls._file.exists() or cls._file.stat().st_size == 0:
            try:
                with open(cls._file, "w") as f:
                    json.dump({}, f)

            except (PermissionError, Exception) as ex:
                raise HTTPException(
                    500, f"{str(ex)}:  Unable to create users file !")

#

    def get_users(self):
        try:
            AuthService.mkfile()

            with open(self._file, "r") as f:
                users = json.load(f)
                return users

        except (json.JSONDecodeError, Exception) as ex:
            raise HTTPException(500, f"{str(ex)}: Unable to read users file !")

#

    def create_access_token(self, user_data: dict) -> str:
        iat = datetime.now()
        exp = iat + self._def_exp

        payload = {**user_data, "iat": iat.timestamp(), "exp": exp.timestamp()}
        return jwt.encode(payload, S_KEY, ALG)

#

    def decode_access_token(self, token: Annotated[str, Depends(auth_scheme)]) -> dict:
        try:
            return jwt.decode(token, S_KEY, [ALG])

        except jwt.ExpiredSignatureError:
            raise HTTPException(
                403, "Session expired. Please log in again !", {
                    "x-session-expire": "true"}
            )

        except jwt.InvalidTokenError:
            raise HTTPException(403, "Unauthorized. Invalid token recieved !")
