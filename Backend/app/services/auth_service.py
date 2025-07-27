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
    file = users_file

    def get_users(self):
        if not self.file.exists() or self.file.stat().st_size == 0:
            with open(self.file, "w") as f:
                json.dump({}, f)

            return {}

        try:
            with open(self.file, "r") as f:
                return json.load(f)

        except json.JSONDecodeError:
            return {}

    def create_access_token(self, user_data) -> str:
        iat = datetime.now()
        exp = iat + timedelta(weeks=5)

        payload = {**user_data, "iat": iat.timestamp(), "exp": exp.timestamp()}
        return jwt.encode(payload, S_KEY, ALG)

    def decode_access_token(self, token: Annotated[str, Depends(auth_scheme)]):
        try:
            return jwt.decode(token, S_KEY, [ALG])

        except jwt.ExpiredSignatureError:
            raise HTTPException(
                403, "Session expired. Please log in again !", {
                    "x-session-exp": "true"}
            )

        except jwt.InvalidTokenError:
            raise HTTPException(403, "Unauthorized. Invalid token recieved !")
