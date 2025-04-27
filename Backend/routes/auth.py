from fastapi import HTTPException, APIRouter
from fastapi.responses import JSONResponse
from passlib.context import CryptContext
from pathlib import Path
import json
import jwt
from datetime import datetime, timedelta
from uuid import uuid4
from models import user

router = APIRouter()

pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

USERS_FILE = Path('data') / 'users.json'
SECRET_KEY = 'SECRET'
ALG = "HS256"


def get_users():
    if not USERS_FILE.exists() or not USERS_FILE.read_text():
        with open(USERS_FILE, 'w') as f:
            json.dump({}, f)

        return {}

    try:
        with open(USERS_FILE, 'r') as f:
            return json.load(f)

    except json.JSONDecodeError:
        return {}


def create_access_token(user_data):
    iat = datetime.now().isoformat()
    exp = (datetime.now() + timedelta(hours=2)).isoformat()

    payload = {**user_data, 'iat': iat, 'exp': exp}
    return jwt.encode(payload, SECRET_KEY, ALG)


@router.post('/register')
async def register(new_user: user.CreateUser):
    users = get_users()

    emails = set(map(lambda x: x['email'], users.values())) if users else set()

    if new_user.email in emails:
        raise HTTPException(
            400, f'User already registered !')

    hashed_pwd = pwd_context.hash(new_user.password)
    id = str(uuid4())

    user = {'__id': id, **new_user.model_dump(), 'password': hashed_pwd}
    users[new_user.username] = user

    try:
        with open(USERS_FILE, 'w') as f:
            json.dump(users, f)

            user_data = {k: v for k, v in user.items() if k != 'password'}
            token = create_access_token(user_data)

            return JSONResponse(user_data, 201, {'x-auth-token': token})

    except json.JSONDecodeError:
        raise HTTPException(500, 'An internal server error occurred !')


@router.post('/login')
async def login(user: user.LoginUser):
    users = get_users()

    emails = set(map(lambda x: x['email'], users.values())) if users else set()

    if not user.email in emails:
        raise HTTPException(
            400, 'User not found. Wrong Email_iD. Please register first !')

    user_obj = next((x for x in users.values()
                     if x['email'] == user.email), None)

    pwd_valid = pwd_context.verify(user.password, user_obj['password'])
    if not pwd_valid:
        raise HTTPException(401, 'Invalid credentials !')

    user_data = {k: v for k, v in user_obj.items() if k != 'password'}
    return create_access_token(user_data)
