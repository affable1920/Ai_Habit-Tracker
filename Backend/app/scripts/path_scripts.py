import app.variables.paths as paths


def all_initialised() -> bool:
    return all(
        (dir.exists() for dir in paths.get_dirs())
        and (file.exists() for file in paths.get_files())
    )


def init_dirs_and_paths():
    if all_initialised():
        return

    for dir in paths.get_dirs():
        if not dir.exists():
            dir.mkdir(parents=True, exist_ok=True)

    for file in paths.get_files():
        file.parent.mkdir(exist_ok=True, parents=True)
        file.touch(exist_ok=True)
