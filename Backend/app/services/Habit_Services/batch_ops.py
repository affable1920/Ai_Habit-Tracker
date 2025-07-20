import json
from typing import Dict, List
from datetime import date, datetime, timedelta

from variables.paths import habits_dir, logs_dir
from fastapi import HTTPException

import logging
from threading import Lock
from services.Habit_Services.utils import parse_logs, update_habits

logger = logging.getLogger("batch_ops")
logging.basicConfig(
    level=logging.INFO,
)


class BatchOps:
    def __init__(self):
        self._all_habits: Dict = {}
        self._lock = Lock()
        self.load_all()

    def load_all(self):
        self._all_habits.clear()

        for file in habits_dir.rglob("*.json"):
            if not file.is_file():
                logger.debug(f"Skipping an object ({file.name}) thats not a file .")
                continue

            habits: List[dict] = []

            if file.stat().st_size == 0:
                logger.debug(f"Empty file {file.name} found .")
                continue

            else:
                with self._lock:
                    try:
                        with open(file, "r") as f:
                            habits = json.load(f)

                            if not isinstance(habits, list):
                                logger.error(
                                    f"Habit Object from file '{file.name}' was not a valid list ."
                                )
                                continue

                    except json.JSONDecodeError:
                        logger.error(
                            f"{file.name} contains invalid json so could not parse it ."
                        )
                        continue

            self._all_habits[file.name] = habits

    def update_streak(self):
        for f_name, habits in self._all_habits.items():
            habits_file = habits_dir / f_name

            if not habits_file.exists():
                logger.debug(
                    f"Trying to read file with name: {f_name} that doesnt exist."
                )
                continue

            logs_file = habits_file.name.split("_")[0] + "_logs.csv"
            logs_file = logs_dir / logs_file

            if not logs_file.exists():
                # user has habits but no logs prob due to being offline mostly. Generate notif for the user.
                continue

            yesterday = date.today() - timedelta(days=1)
            habit_logs: dict = parse_logs(logs_file, yesterday)

            habits = update_habits(habits, habit_logs, yesterday, logs_file)

            with self._lock:
                try:
                    with open(habits_file, "w") as f:
                        json.dump(habits, f)
                        logger.info(
                            f"Streaks reset successfully on {datetime.now().isoformat()}"
                        )

                except json.JSONDecodeError:
                    raise HTTPException(500, "An internal server error occurred !")

                except FileNotFoundError:
                    raise HTTPException(501, "File not found !")

    def correct_habits(self):
        for f_name, habits in self._all_habits.items():
            file = habits_dir / f_name

            for h in habits:
                h["completed"] = False

            with open(file, "w") as f:
                json.dump(habits, f)
