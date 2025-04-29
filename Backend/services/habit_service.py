import json
from pathlib import Path
from fastapi import HTTPException
from pydantic import ValidationError

import variables.dirs as d
import models.Habit as model


class Habit_Service:
    def __init__(self):
        Habit_Service.init_dirs()

    @classmethod
    def init_dirs(cls):
        d.data_dir.mkdir(parents=True, exist_ok=True)
        d.logs_dir.mkdir(parents=True, exist_ok=True)
        d.habits_dir.mkdir(parents=True, exist_ok=True)

    def read_all(self, filename):
        if not filename.exists():
            with open(filename, "w") as f:
                json.dump([], f)

            return []

        try:
            with open(filename, "r") as f:
                return json.load(f)

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
            habits = [h["title".lower()].startswith(sq) for h in habits]

        if query["status"]:
            print(query["status"])
            # habits = [h['completed'] == query['status'] for h in habits]

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
