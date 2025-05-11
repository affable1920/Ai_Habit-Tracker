import json
from datetime import date, time, timedelta, datetime
from pathlib import Path
from fastapi import HTTPException
from pydantic import ValidationError

import logging
from datetime import datetime

import models.Habit as model
from variables.paths import habits_dir, logs_dir
from services.Habit_Services.logger import Csv_Logger as Csv_Logger

logger = logging.getLogger("service_habit")
logging.basicConfig(level=logging.INFO)


csv_logger = Csv_Logger()


class CRUD:
    def get_habit_file(self, user_id):
        return habits_dir / f"user{user_id}_habits.json"

    def read_all(self, filename):
        if not filename.exists() or filename.stat().st_size == 0:
            with open(filename, "w") as f:
                json.dump([], f)

            return []

        try:
            with open(filename, "r") as f:
                habits = [h for h in json.load(f) if isinstance(h, dict)]
                return habits

        except json.JSONDecodeError as e:
            print(e)
            raise HTTPException(500, "An internal server error occurred !")

        except FileNotFoundError:
            return []

    def read(self, user_id, query):
        filename = self.get_habit_file(user_id)

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

    def add_habit(self, user_id, habit):
        filename = self.get_habit_file(user_id)
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

    def get_habit(self, filename: Path, habit_id: str):
        habits = self.read_all(filename)
        for habit in habits:
            if habit["id"] == habit_id:
                return habit

        else:
            raise HTTPException(404, "Habit Not Found !")

    def update_Habit(self, user_id, habit_id, fields):
        habits_file = habits_dir / f"user{user_id}_habits.json"
        logs_file = logs_dir / f"user{user_id}_logs.csv"

        habits = self.read_all(habits_file)
        to_upd = self.get_habit(habits_file, habit_id)

        to_upd.update(**fields)
        completion_upd = fields.get("completed", False)

        log = []

        if completion_upd:
            now = datetime.now().isoformat()
            logger.info("Launcing completion update procedure.")
            to_upd["completion_log"] = (
                [*to_upd["completion_log"], now] if to_upd["completion_log"] else [now]
            )
            to_upd["last_completed"] = now
            to_upd["status"] = "completed"

            log = [
                habit_id,
                to_upd.get("title", None),
                date.today().isoformat(),
                datetime.now().time().isoformat(),
                to_upd.get("completed", False),
            ]

            logger.info("Habit was successfully updated.")

            # Send task for batch update of streak in a queue .
        habits = list(map(lambda x: to_upd if x["id"] == habit_id else x, habits))

        try:
            with open(habits_file, "w") as f:
                json.dump(habits, f)
                logger.info(
                    "Successfull in writing the updated habit to the user's habit collection"
                )

                if completion_upd:
                    logger.info("Started to write on user's Csv File !")
                    csv_logger.write_logs(logs_file, log)

                return to_upd

        except json.JSONDecodeError:
            raise HTTPException(500, "An internal server error occurred !")

    def delete_habit(self, user_id, habit_id):
        filename = habits_dir / f"user{user_id}_habits.json"

        habits = self.read_all(filename)
        habits = list(filter(lambda h: h["id"] != habit_id, habits))

        try:
            with open(filename, "w") as f:
                json.dump(habits, f)

        except json.JSONDecodeError:
            raise HTTPException(500, "An internal server error occurred !")
