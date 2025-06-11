import csv
from datetime import date, datetime, timedelta
import pandas as pd
from variables.paths import logs_dir
import array


class LogScrapper:
    def __init__(self):
        self._logs = []
        self.load_logs()

    def load_logs(self):
        for file in logs_dir.rglob("*.csv"):
            if not file.is_file():
                continue

            with open(file, "r") as f:
                df = pd.read_csv(f)


messy = LogScrapper()
