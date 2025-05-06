from pathlib import Path
import variables.dirs as d


def get_root():
    current_dir = Path(__file__).parent

    while current_dir.name != "asana" and current_dir != current_dir.parent:
        root = current_dir.parent

    if root == current_dir.parent:
        raise RuntimeError("The root directory could not be found .")

    return root


def get_dirs():
    return [d.data_dir, d.backup_dir, d.habits_dir, d.logs_dir]


def init_dirs():
    root = get_root()
    dirs_to_init = get_dirs()

    dirs_to_init = [root / dir for dir in dirs_to_init]

    for dir in dirs_to_init:
        if not dir.exists():
            dir.mkdir(parents=True, exist_ok=True)
