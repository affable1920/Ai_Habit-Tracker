from typing import Annotated
from fastapi.responses import JSONResponse
from fastapi import APIRouter, Depends, HTTPException, Query

from app.models import Habit
from app.services.auth_service import AuthService
from app.services.Habit_Services.crud import CRUD
from app.models.QueryParams import QueryParameters

router = APIRouter()
auth_service = AuthService()


def get_CRUD(token: Annotated[dict, Depends(auth_service.decode_access_token)]) -> CRUD:
    try:
        user_id = token["id"]
        return CRUD(user_id)

    except KeyError:
        raise HTTPException(
            401, "Unauthorized user. Missing essential attributes !")
    except Exception:
        raise HTTPException(401, "Authorization failed !")


@router.get("/")
def get(
    query: Annotated[QueryParameters, Query()],
    CRUD: CRUD = Depends(get_CRUD),
):
    habits = CRUD.read(query)
    return JSONResponse(habits, 200)


@router.post("/")
def add(client_data: Habit.HabitClientSide, CRUD: CRUD = Depends(get_CRUD)):
    server_habit: Habit.FullHabit = CRUD.add_habit(client_data)
    return JSONResponse(server_habit.model_dump(), 201)


@router.put("/{habit_id}")
def update(habit_id: str, fields: Habit.UpdateHabit, CRUD: CRUD = Depends(get_CRUD)):
    server_updated_habit = CRUD.update_Habit(habit_id, fields=fields)
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
