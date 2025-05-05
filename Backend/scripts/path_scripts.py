import variables.dirs as d


def init_dirs():
    d.data_dir.mkdir(parents=True, exist_ok=True)
    d.logs_dir.mkdir(parents=True, exist_ok=True)
    d.habits_dir.mkdir(parents=True, exist_ok=True)
    d.backup_dir.mkdir(parents=True, exist_ok=True)
