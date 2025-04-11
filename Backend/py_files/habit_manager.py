import json
from pathlib import Path
import uuid
import csv
from datetime import datetime

data_dir = Path('data')

habits_dir = data_dir / 'habits'
logs_dir = data_dir / 'logs'

class HabitManager:
    def __init__(self):
        HabitManager.init_dirs()

    @classmethod
    def init_dirs(cls):
        data_dir.mkdir(parents=True, exist_ok=True)
        habits_dir.mkdir(parents=True, exist_ok=True)

        logs_dir.mkdir(exist_ok=True, parents=True)


    def read_habits(self, user_id):
        filename = habits_dir / f'user{user_id}_habits.json'

        if not filename.exists() or not filename.read_text():
            with open(filename, 'w') as f:
                json.dump([], f)
                return []

        try:
            with open(filename, 'r') as f:
                habits = json.load(f)
                return habits
            
        except json.JSONDecodeError as e:
            print(f'{e}')
        

    def add_habit(self, habit, user_id):
        habits = self.read_habits(user_id)

        habits_file = habits_dir / f'user{user_id}_habits.json'
        logs_file = logs_dir / f'user{user_id}_logs.csv'

        habit_to_add = { 'id': str(uuid.uuid4()), **habit }
        habits.append(habit_to_add)

        try:
            with open(habits_file, 'w') as file:
                json.dump(habits, file)
                
                mode = 'a' if logs_file.exists() else 'w'
                
                try:
                    with open(logs_file, mode) as logs_csv:
                        writer = csv.writer(logs_csv)
    
                        if mode == 'w':
                            writer.writerow(['Habit_name', 'Action', 'Timestamp'])
    
                        writer.writerow([habit_to_add['title'], 'Creation', datetime.now()])

                except FileNotFoundError as e:
                    return f"A csv logging error occurred."

                return habit_to_add

        except json.JSONDecodeError as e:
            return e
        
