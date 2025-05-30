// ref.current can stillSafe be null at the moment useEffect runs, even if you guard it.

// React might render before the DOM element is actually mounted.

// Or the ref gets cleaned up before ResizeObserver’s cleanup executes.
