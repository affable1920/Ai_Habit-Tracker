import json
from pathlib import Path
from typing import Dict, List
from datetime import datetime

import variables.dirs as dirs
from fastapi import HTTPException

import logging
from threading import Lock

logger = logging.getLogger("batch_ops")
logging.basicConfig(
    level=logging.INFO,
)


class BatchOps:
    def __init__(self):
        self._all_habits: Dict = {}
        self._dir: Path = dirs.habits_dir
        self._lock = Lock()
        self.load_all()

    def load_all(self):
        self._all_habits.clear()

        for file in self._dir.rglob("*.json"):
            if not file.is_file():
                logger.debug(f"Skipping an object ({file.name}) thats not a file .")
                continue

            habits = List[dict]

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
                                    f"Habits from file {file.name} were not inside a valid list ."
                                )
                                habits = []

                    except json.JSONDecodeError:
                        logger.error(
                            f"{file.name} contains invalid json so could not parse it ."
                        )

            self._all_habits[file.stem] = habits

    def reset_fields(self, h):
        done = h["completed"]
        fields = {
            "completed": False,
            "status": "incomplete",
            "streak": h["streak"] + 1 if done else 0,
        }
        upd_habit = {**h, **fields}
        return upd_habit

    def update_streak(self):
        for f_name, habits in self._all_habits.items():
            habits = [self.reset_fields(h) for h in habits if isinstance(h, dict)]
            file = self._dir / f_name

            with self._lock:
                try:
                    with open(f"{file}.json", "w") as f:
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
            if len(habits) == 0:
                logger.info(f"Habits for file {f_name} were empty !")
                continue

            incorrect_habits = [
                habit
                for habit in habits
                if habit["completed"] and habit["status"] == "incomplete"
            ]

            last_completed = [h["last_completed"] for h in incorrect_habits]
            try:
                for l_c in last_completed:
                    completed_today = (
                        datetime.fromisoformat(l_c) == datetime.now().date()
                    )

            except Exception as e:
                print(e)
