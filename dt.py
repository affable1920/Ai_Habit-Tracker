from datetime import date, time, timedelta, datetime


dt = date.today().isoformat()


dt_new = date.fromisoformat(dt)

print(datetime.now().time().isoformat())
