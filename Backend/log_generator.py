import uuid
import random
import pandas as pd
from datetime import datetime, timedelta

# Sample data to use
habit_names = [
    ("Run 5km", "Health"),
    ("Workout", "Health"),
    ("Meditation", "Wellness"),
    ("Read 20 Pages", "Study"),
    ("Learn JavaScript", "Study"),
    ("Practice Piano", "Skill"),
    ("Eat 5 Veggies", "Health"),
    ("Study Calculus 30 Min", "Study"),
    ("Journal", "Wellness"),
    ("Stretching", "Health"),
    ("Drink Water", "Health"),
    ("Code 1 Hour", "Skill"),
    ("Yoga", "Wellness"),
    ("Write Blog", "Skill"),
    ("Clean Room", "Chore"),
    ("Do Laundry", "Chore"),
    ("Sleep 8 Hours", "Wellness"),
    ("Walk 10k Steps", "Health"),
]


def generate_log_entry():
    habit_id = str(uuid.uuid4())
    habit_name, habit_category = random.choice(habit_names)
    priority = random.randint(1, 5)

    # Random datetime within the past 7 days
    dt = datetime.now() - timedelta(
        days=random.randint(0, 6),
        hours=random.randint(0, 23),
        minutes=random.randint(0, 59),
    )
    date_str = dt.strftime("%Y-%m-%d")
    time_str = dt.strftime("%H:%M:%S")
    timestamp = dt.isoformat()

    completed = random.choice([True, False])
    time_of_day = dt.hour
    day_of_week = dt.weekday()  # 0 = Monday, 6 = Sunday

    # Simulate past 3 days completion history as 0/1
    past_three_days = ",".join(str(random.choice([0, 1])) for _ in range(3))

    return [
        habit_id,
        habit_name,
        habit_category,
        priority,
        timestamp,
        date_str,
        time_str,
        time_of_day,
        day_of_week,
        past_three_days,
        completed,
    ]


# Define header
header = [
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

# Generate 100 rows
logs = [generate_log_entry() for _ in range(100)]
print(logs)

# Create DataFrame
df = pd.DataFrame(logs, columns=header)

# Save to CSV
csv_path = "generated_habit_logs.csv"
df.to_csv(csv_path, index=False)

# csv_path
