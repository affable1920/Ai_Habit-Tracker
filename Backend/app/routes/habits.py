from typing import Annotated
from fastapi.responses import JSONResponse
from fastapi import APIRouter, Depends, Query

import app.models.Habit as model
from app.services.Habit_Services.crud import CRUD
from app.services.auth_service import AuthService

router = APIRouter()
auth_service = AuthService()


def get_CRUD(token: Annotated[str, Depends(auth_service.decode_access_token)]) -> CRUD:
    user_id = token["id"]
    return CRUD(user_id)


@router.get("/")
def get(
    query: Annotated[model.Query, Query()],
    CRUD: CRUD = Depends(get_CRUD),
):
    habits = CRUD.read(query)
    return JSONResponse(habits, 200)


@router.post("/")
def add(client_data: model.ClientData, CRUD: CRUD = Depends(get_CRUD)):
    new_habit = {**model.Defaults().model_dump(), **client_data.model_dump()}
    server_habit = CRUD.add_habit(new_habit)
    return JSONResponse(server_habit.model_dump(), 201)


@router.put("/{habit_id}")
def update(habit_id: str, fields: model.UpdateHabit, CRUD: CRUD = Depends(get_CRUD)):
    to_upd_fields = fields.model_dump(exclude_none=True, exclude_unset=True)
    server_updated_habit = CRUD.update_Habit(habit_id, to_upd_fields)
    return JSONResponse(server_updated_habit.model_dump(), 201)


# Completion route.
@router.put("/complete/{habit_id}")
def mark_complete(habit_id: str, CRUD: CRUD = Depends(get_CRUD)):
    completed_habit = CRUD.mark_complete(habit_id)
    return JSONResponse(completed_habit.model_dump(), 201)


@router.delete("/{habit_id}")
def delete(habit_id: str, CRUD: CRUD = Depends(get_CRUD)):
    CRUD.delete_habit(habit_id)
    return JSONResponse("Habit deleted !", 201)
