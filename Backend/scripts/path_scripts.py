import variables.dirs as dir


def init_dirs():
    dir.data_dir.mkdir(parents=True, exist_ok=True)
    dir.logs_dir.mkdir(parents=True, exist_ok=True)
    dir.habits_dir.mkdir(parents=True, exist_ok=True)
    dir.backup_dir.mkdir(parents=True, exist_ok=True)
