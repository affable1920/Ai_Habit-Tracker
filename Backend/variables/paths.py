from pathlib import Path


ROOT = Path().cwd()


def R(*parts):
    return ROOT.joinpath(*parts)


data_dir = R("Data")
habits_dir = R("Data", "Habits")

backup_dir = R("Backups")
logs_dir = R("Logs")

files_dir = R("Files")
users_file = R("Files", "users.json")


def get_dirs():
    dirs = [data_dir, habits_dir, logs_dir, backup_dir, files_dir]
    return dirs


def get_files():
    files = [users_file]
    return files
