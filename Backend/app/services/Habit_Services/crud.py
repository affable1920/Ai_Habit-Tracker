import json
from pathlib import Path
from datetime import datetime
from fastapi import HTTPException
from pydantic import ValidationError

import logging
from datetime import datetime

from app.models import Habit
from app.models import QueryParams
from app.variables.paths import habits_dir, logs_dir
from app.services.Habit_Services.logger import Csv_Logger as Csv_Logger

logger = logging.getLogger("service_habit")
logging.basicConfig(level=logging.INFO)


csv_logger = Csv_Logger()


class CRUD:
    def __init__(self, user_id: str):
        self.user_id = user_id
        self.logs: Path = logs_dir / f"user{user_id}_logs.csv"
        self.filename: Path = habits_dir / f"user{user_id}_habits.json"

    #

    def ensure_file(self):
        file = self.filename

        try:
            if not file.exists() or file.stat().st_size == 0:
                with open(file, "w") as f:
                    json.dump([], f)

        except (PermissionError, Exception) as ex:
            print(ex)

#

    def read_all(self) -> list:
        self.ensure_file()

        try:
            with open(self.filename, "r") as f:
                habits: list = json.load(f)
                return habits

        except json.JSONDecodeError as ex:
            print(ex)
            logger.error("An internal 500 server error occurred.")
            raise HTTPException(500, "An internal server error occurred !")

#
    def read(self, query: QueryParams.QueryParameters) -> list:
        habits = self.read_all()
        if len(habits) == 0:
            return

        if query.searchQuery:
            sq = query.searchQuery.lower()
            habits = [h for h in habits if h["title"].lower().startswith(sq)]

        if query.status:
            st = query.status.lower()
            habits = [h for h in habits if h["status"].lower() == st]

        start = (query.page - 1) * query.max
        end = min(start + query.max, len(habits))

        habits = habits[start:end]
        return habits

#

    def add_habit(self, new_habit: Habit.HabitClientSide) -> Habit.FullHabit:
        try:
            habit_to_add = {**new_habit.model_dump(), **
                            Habit.HabitDefaults().model_dump()}
            server_habit = Habit.FullHabit(**habit_to_add)

        except ValidationError:
            raise HTTPException(
                500, f"Invalid data recieved!, Please send a valid Habit object."
            )

        habits = self.read_all()
        habits.insert(0, server_habit.model_dump())

        try:
            with open(self.filename, "w") as f:
                json.dump(habits, f)
                return server_habit

        except ValidationError:
            raise HTTPException(
                500, f"Invalid data recieved!, Please send a valid Habit object."
            )

        except Exception:
            raise HTTPException(400, f"An internal server error occurred !")

    #

    def get_habit(self, habit_id) -> Habit.FullHabit | None:
        habits = self.read_all()
        habit = next((h for h in habits if h["id"] == habit_id), None)
        return Habit.FullHabit(**habit) if habit else None

    #

    def update_Habit(self, habit_id, fields) -> Habit.FullHabit:
        habits = self.read_all()
        to_upd_habit = self.get_habit(habit_id).model_dump()

        to_upd_habit.update(**fields)
        updated_habit = Habit.FullHabit(**to_upd_habit)

        upd_habits = [
            updated_habit.model_dump() if h["id"] == habit_id else h for h in habits
        ]

        try:
            with open(self.filename, "w") as f:
                json.dump(upd_habits, f)
                logger.info(
                    "Successfull in writing the updated habit to the user's habit collection"
                )

                return updated_habit

        except json.JSONDecodeError:
            raise HTTPException(500, "An internal server error occurred !")

    #

    # Completion Route.
    def mark_complete(self, habit_id) -> Habit.FullHabit:
        habit = self.get_habit(habit_id)
        today_str = datetime.now().isoformat()

        completed_habit = habit.model_copy(update={
            "completed": True,
            "status": "complete",
            "last_completed": today_str,
            "completion_log": [*(habit.completion_log or []), today_str]
        })

        habits = self.read_all()
        habits = [
            completed_habit.model_dump() if h["id"] == habit_id else h for h in habits
        ]

        try:
            with open(self.filename, "w") as f:
                json.dump(habits, f)
                return completed_habit

        except ValidationError:
            raise HTTPException(500, "An internal server error occurred !")

        #

    def delete_habit(self, habit_id) -> None:
        habits = self.read_all()
        upd_habits = [h for h in habits if h["id"] != habit_id]

        try:
            with open(self.filename, "w") as f:
                json.dump(upd_habits, f)

        except json.JSONDecodeError:
            raise HTTPException(500, "An internal server error occurred !")
