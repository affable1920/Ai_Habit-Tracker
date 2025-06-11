import csv
import logging
from pathlib import Path


logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)


class Csv_Logger:
    def write_logs(self, filename: Path, log: list):
        exists = filename.exists()

        header: list[str] = [
            "habit_id",
            "habit_name",
            "habit_category",
            "priority",
            "timestamp",
            "date",
            "time",
            "time_of_day",
            "day_of_week",
            "past_three_days",
            "completed",
        ]

        has_headers = False

        if exists:
            with open(filename, "r") as csv_file:
                reader = list(csv.reader(csv_file))
                has_headers = reader and reader[0] == header

        mode = "a" if has_headers else "w"

        try:
            with open(filename, mode, newline="") as csv_file:
                writer = csv.writer(csv_file)
                logger.info("Writing csv file .")

                if mode == "w":
                    writer.writerow(header)

                writer.writerow(log)
                logger.info("Successfully wrote to csv file .")

        except (csv.Error, Exception) as e:
            logger.error(e)
            raise
