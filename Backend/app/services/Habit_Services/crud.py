import json
from datetime import datetime
from pathlib import Path
from fastapi import HTTPException
from pydantic import ValidationError

import logging
from datetime import datetime

import app.models.Habit as model
from app.variables.paths import habits_dir, logs_dir
from app.services.Habit_Services.logger import Csv_Logger as Csv_Logger

logger = logging.getLogger("service_habit")
logging.basicConfig(level=logging.INFO)


csv_logger = Csv_Logger()


class CRUD:
    def __init__(self, user_id: str):
        self.user_id = user_id
        self.filename = habits_dir / f"user{user_id}_habits.json"
        self.logs = logs_dir / f"user{user_id}_logs.csv"

    #

    def ensure_file(self):
        file = self.filename
        if not file.exists() or file.stat().st_size == 0:
            with open(file, "w") as f:
                json.dump([], f)

    def read_all(self) -> list:
        self.ensure_file()

        try:
            with open(self.filename, "r") as f:
                habits = json.load(f)
                return habits

        except json.JSONDecodeError as e:
            logger.error("An internal 500 server error occurred.")
            raise HTTPException(500, "An internal server error occurred !")

        except FileNotFoundError:
            return []

    def read(self, query) -> list:
        if not isinstance(query, dict):
            query = query.model_dump()

        habits = self.read_all()

        start = (query["page"] - 1) * query["max"]
        end = query["max"] * query["page"]

        if query["search_query"]:
            sq = query["search_query"].lower()
            habits = [h for h in habits if h["title"].lower().startswith(sq)]

        if query["status"]:
            habits = [h for h in habits if h["completed"] == True]

        if query["status"] == False:
            habits = [h for h in habits if h["completed"] == False]

        habits = habits[start:end]
        return habits

    def add_habit(self, new_habit) -> model.Habit:
        try:
            server_habit = model.Habit(**new_habit)

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

    def get_habit(self, habit_id) -> model.Habit:
        habits = self.read_all()
        for habit in habits:
            if habit["id"] == habit_id:
                return model.Habit(**habit)

        else:
            raise HTTPException(404, "Habit Not Found !")

    #

    def update_Habit(self, habit_id, fields) -> model.Habit:
        habits = self.read_all()
        to_upd_habit = self.get_habit(habit_id).model_dump()

        to_upd_habit.update(**fields)

        updated_habit = model.Habit(**to_upd_habit)
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
    def mark_complete(self, habit_id) -> model.Habit:
        to_complete_habit = self.get_habit(habit_id)

        to_complete_habit.completed = True
        to_complete_habit.status = "complete"

        today = datetime.now()
        today_str = today.isoformat()

        to_complete_habit.last_completed = today_str
        to_complete_habit.completion_log = [
            *to_complete_habit.completion_log,
            today_str,
        ]

        habits = self.read_all()
        habits = [
            to_complete_habit.model_dump() if h["id"] == habit_id else h for h in habits
        ]

        try:
            with open(self.filename, "w") as f:
                json.dump(habits, f)
                return to_complete_habit

        except ValidationError:
            raise HTTPException(500, "An internal server error occurred !")

        #

    def delete_habit(self, habit_id) -> None:
        habits = self.read_all()
        upd_habits = list(filter(lambda h: h["id"] != habit_id, habits))

        try:
            with open(self.filename, "w") as f:
                json.dump(upd_habits, f)

        except json.JSONDecodeError:
            raise HTTPException(500, "An internal server error occurred !")
