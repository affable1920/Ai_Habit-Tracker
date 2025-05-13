import csv
from datetime import date, datetime, timedelta
import pandas as pd
from variables.paths import logs_dir


class Messy:
    def __init__(self):
        self._logs = []
        self.load_logs()

    def load_logs(self):
        for file in logs_dir.rglob("*.csv"):
            if file.stem != "players" or not file.is_file():
                return

            df = pd.read_csv(file).dropna()

            try:
                # years = (df["yearid"] >= 2011) & (df["yearid"] <= 2016)
                # df = df.iloc[years.values, [4, 5, 10, 13]]

                # df = df.assign(Fullname=(df.namefirst + " " + df.namelast))

                # df = df.iloc[(df.Fullname == "Roy Halladay").values]

                df = df.groupby(["yearid", "teamid"])["salary"].describe()
                print(df)

            except Exception as e:
                print(e)


messy = Messy()
