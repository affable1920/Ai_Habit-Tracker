from pathlib import Path


def get_root():
    root = Path(__file__).parent

    while root.name != "asana" and root != root.parent:
        root = root.parent

    if root == root.parent:
        raise RuntimeError("The root directory could not be found .")

    return root


def R(*parts):
    return ROOT.joinpath(*parts)


ROOT = get_root()

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
