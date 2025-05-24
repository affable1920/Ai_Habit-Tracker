import csv
from datetime import date, datetime, timedelta
import pandas as pd
from variables.paths import logs_dir
import array


class Messy:
    def __init__(self):
        self._logs = []
        self.load_logs()

    def load_logs(self):
        for file in logs_dir.rglob("*.csv"):
            if file.stem != "players" or not file.is_file():
                return

            df = pd.read_csv(file)

            # category stats

            bats = df["bats"].value_counts()
            throws = df["throws"].value_counts()

            head = df.head(4)

            countries = df["birthcountry"].nunique()
            countries_count = df["birthcountry"].value_counts()

            teams = df["teamid"].unique().astype(list)
            teams_count = df["teamid"].value_counts()

            # stats

            salary_desc = df["salary"].describe()

            weight_desc = df["weight"].describe()
            height_desc = df["height"].describe()

            print(head)


messy = Messy()
