from typing import Annotated
from fastapi import APIRouter, Depends, Query
from fastapi.responses import JSONResponse

from services.habit_service import Habit_Service
from services.auth_service import decode_access_token

import variables.paths as p
import models.Habit as model

router = APIRouter()
CRUD = Habit_Service()


@router.get("/")
def get(
    token: Annotated[str, Depends(decode_access_token)],
    query: Annotated[model.Query, Query()],
):
    user_id = token["id"]

    user_habits = p.habits_dir / f"user{user_id}_habits.json"
    habits = CRUD.read(user_habits, query)

    return JSONResponse(habits)


@router.post("/")
def add(
    habit: model.FE_Data,
    token: Annotated[str, Depends(decode_access_token)],
):
    user_id = token["id"]

    user_habits = p.habits_dir / f"user{user_id}_habits.json"
    server_habit = CRUD.add_habit(user_habits, habit)

    return JSONResponse(server_habit, 201)


@router.put("/{habit_id}")
def update(token: Annotated[str, Depends(decode_access_token)], habit_id: str):
    user_id = token["id"]
    user_habits = p.habits_dir / f"user{user_id}_habits.json"

    return CRUD.update_Habit(
        user_habits, habit_id, {"completed": True, "status": "complete"}
    )


@router.delete("/{habit_id}")
def delete(token: Annotated[str, Depends(decode_access_token)], habit_id: str):
    user_id = token["id"]
    user_habits = p.habits_dir / f"user{user_id}_habits.json"

    CRUD.delete_habit(user_habits, habit_id)
    return JSONResponse("Habit deleted !")
