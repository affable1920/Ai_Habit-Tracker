import json
from pathlib import Path
from random import randint
import uuid
import csv
from datetime import datetime

data_dir = Path('data')

habits_dir = data_dir / 'habits'
logs_dir = data_dir / 'logs'


class HabitManager:
    _defaults = {'reminder_Times': {}, 'streak': 0, 'completed': False,
                 'progress': [], 'archived': False, 'status': "incomplete", 'created_at': datetime.now().isoformat(),
                 'last_completed': None, 'completion_log': []}

    _query = {'limit': 10, 'page': 1, 'search_query': '', 'status': None}

    def __init__(self):
        HabitManager.init_dirs()

    @classmethod
    def init_dirs(cls):
        data_dir.mkdir(parents=True, exist_ok=True)
        habits_dir.mkdir(parents=True, exist_ok=True)

        logs_dir.mkdir(exist_ok=True, parents=True)

    def write_log(self, log_file):
        logs = []

        try:
            with open(log_file, 'r') as f:
                logs == (csv.reader(f))

        except FileNotFoundError:
            print('Log file didnt exist so creating one')
#

    def read_all(self, user_id):
        filename = habits_dir / f'user{user_id}_habits.json'

        if not filename.exists() or not filename.read_text():
            with open(filename, 'w') as f:
                json.dump([], f)
                return (True, [])

        try:
            with open(filename, 'r') as f:
                habits = json.load(f)
                return (True, habits)

        except json.JSONDecodeError as e:
            return (False, f'An internal server error occurred !', f'JSON ERROR {e}')

#

    def read_habits(self, user_id, query=None):
        query = {**self._query, **(query or {})}

        start = (query['page'] - 1) * query['limit']
        end = query['page'] * query['limit']

        _, habits = self.read_all(user_id)

        if query['search_query']:
            sq = query['search_query'].lower()
            habits = [h for h in habits if h['title'].lower().startswith(sq)]

        if query['status']:
            st = query['status'] == 'true'
            habits = [h for h in habits if h['completed'] == st]

        habits = habits[start: end]
        return (True, habits)

#

    def add_habit(self, new_habit, user_id):
        if not isinstance(new_habit, dict):
            return (False, 'Please send a valid habit object to the backend!', 'Habit not dict')

        if 'id' in new_habit:
            new_habit.pop('id')

        habits_file = habits_dir / f'user{user_id}_habits.json'
        succ, habits = self.read_all(user_id)

        if not succ or not isinstance(habits, list):
            habits = []

        habit_to_add = {**new_habit, **self._defaults, 'id': str(uuid.uuid4())}
        habits.insert(0, habit_to_add)

        try:
            with open(habits_file, 'w') as file:
                json.dump(habits, file)
                return (True, habit_to_add)

        except (json.JSONDecodeError, Exception) as e:
            return (False, 'An internal server error occurred !', f'JSON ERROR {e}')
#

    def update_habit(self, user_id, habit_id, fields):
        habits_file = habits_dir / f'user{user_id}_habits.json'

        if 'completed' in fields and fields['completed'] == True:
            comp_upd = True

        _, habits = self.read_all(user_id)

        for habit in habits:
            if not isinstance(habit, dict):
                # log error
                continue

            if habit['id'] == habit_id:
                habit.update(fields)

                if comp_upd:
                    habit['streak'] += 1
                break

        else:
            return (False, 'No such habit could be found !', '')

        try:
            with open(habits_file, 'w') as f:
                json.dump(habits, f)
                return (True, 'Habit successfully updated !')

        except Exception:
            return (False, f'Could not update habit due to internal server errors. Please try again later !')

    def delete_habit(self, user_id, habit_id):
        _, habits = self.read_all(user_id)

        habits = list(filter(lambda x: x['id'] != habit_id, habits))
        habits_file = habits_dir / f'user{user_id}_habits.json'

        try:
            with open(habits_file, 'w') as f:
                json.dump(habits, f)
                return (True, 'Habit was successfully deleted')

        except Exception:
            return (False, 'Could not delete habit')


# read all returns a bool and habits list
