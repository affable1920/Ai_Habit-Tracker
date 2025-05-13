import csv
import logging

from pathlib import Path
from datetime import date, datetime


from services.Habit_Services.logger import Csv_Logger

csv_logger = Csv_Logger()


def parse_logs(logs_file: Path, yesterday: date):
    _logs: dict = {}

    with open(logs_file, "r") as file:
        logs = csv.reader(file)

        next(logs, None)
        for log in logs:
            dt_str = log[2]

            try:
                dt = date.fromisoformat(dt_str)

            except TypeError:
                logging.error(
                    f"log file with name {logs_file.name} has a log with id: {log[0]} whose date is not of correct date string type ."
                )
                continue

            if dt == yesterday:
                _logs[log[0]] = {dt: log[4]}

    return _logs


def update_habits(habits: list, logs: dict, yesterday: date, logs_file: Path):
    for habit in habits:
        if not isinstance(habit, dict):
            logging.debug(f"{habit} is not a dict .")
            continue

        completed = logs.get(habit["id"], {}).get(yesterday, False)

        if not completed:
            lg = [
                habit["id"],
                habit["title"],
                date.today().isoformat(),
                datetime.now().time().isoformat(),
                completed,
            ]
            csv_logger.write_logs(logs_file, lg)

        habit["completed"] = False
        habit["status"] = "incomplete"

        habit["streak"] = habit["streak"] + 1 if completed else 0

    return habits
