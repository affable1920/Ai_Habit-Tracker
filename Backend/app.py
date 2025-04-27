from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.auth import router as auth

app = FastAPI()

origins = ['http://localhost:5173', 'http://localhost:5174']
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_methods=[
                   '*'], allow_headers=['*'], allow_credentials=True, expose_headers=['x-auth-token'])

app.include_router(auth, prefix='/auth', tags=['Authentication'])
