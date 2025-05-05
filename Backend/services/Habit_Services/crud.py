import json
import datetime
from pathlib import Path
from fastapi import HTTPException
from pydantic import ValidationError

import logging
from datetime import datetime

import models.Habit as model

logger = logging.getLogger("service_habit")
logging.basicConfig(level=logging.INFO)


class CRUD:
    def read_all(self, filename):
        if not filename.exists() or not filename.read_text():
            with open(filename, "w") as f:
                json.dump([], f)

            return []

        try:
            with open(filename, "r") as f:
                habits = [h for h in json.load(f) if isinstance(h, dict)]
                return habits

        except json.JSONDecodeError:
            raise HTTPException(500, "An internal server error occurred !")

        except FileNotFoundError:
            return []

    def read(self, filename, query):
        if not isinstance(filename, Path):
            raise HTTPException(500, "An internal server error occurred !")

        if not isinstance(query, dict):
            query = query.model_dump()

        habits = self.read_all(filename)

        start = (query["page"] - 1) * query["limit"]
        end = query["limit"] * query["page"]

        if query["search_query"]:
            sq = query["search_query"].lower()
            habits = [h for h in habits if h["title"].lower().startswith(sq)]

        if query["status"]:
            habits = [h for h in habits if h["completed"] == True]

        if query["status"] == False:
            habits = [h for h in habits if h["completed"] == False]

        habits = habits[start:end]
        return habits

    def add_habit(self, filename, habit):
        habits = self.read_all(filename)

        try:
            defaults = model.Defaults().model_dump()

            if not isinstance(habit, dict):
                habit = habit.model_dump()

            new_habit = {**habit, **defaults}
            habits.insert(0, new_habit)

            try:
                with open(filename, "w") as f:
                    json.dump(habits, f)
                    return new_habit

            except (ValidationError, Exception) as e:
                raise HTTPException(400, f"Invalid data recieved ! {str(e)}")

        except ValidationError as e:
            raise HTTPException(500, f"An internal server error occurred ! {str(e)}")

    def get_habit(self, filename, habit_id: str):
        habits = self.read_all(filename)
        for habit in habits:
            if habit["id"] == habit_id:
                return habit

        else:
            raise HTTPException(404, "Habit Not Found !")

    def update_Habit(self, filename, habit_id, fields):
        habits = self.read_all(filename)
        to_upd = self.get_habit(filename, habit_id)

        to_upd.update(**fields)

        if fields.get("completed", False):
            to_upd["completion_log"] = (
                [*to_upd["completion_log"], datetime.now().date().ctime()]
                if to_upd["completion_log"]
                else [datetime.now().ctime()]
            )
            to_upd["last_completed"] = datetime.now().isoformat()
            to_upd["status"] = "completed"

            # Send task for batch update of streak in a queue .
        habits = list(map(lambda x: to_upd if x["id"] == habit_id else x, habits))

        try:
            with open(filename, "w") as f:
                json.dump(habits, f)
                return to_upd

        except json.JSONDecodeError:
            raise HTTPException(500, "An internal server error occurred !")

    def delete_habit(self, filename, habit_id):
        habits = self.read_all(filename)
        habits = list(filter(lambda h: h["id"] != habit_id, habits))

        try:
            with open(filename, "w") as f:
                json.dump(habits, f)

        except json.JSONDecodeError:
            raise HTTPException(500, "An internal server error occurred !")
