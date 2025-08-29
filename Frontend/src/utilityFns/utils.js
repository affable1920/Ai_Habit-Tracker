export function debounce(fn, ms, { leading = false } = {}) {
  let cache = "";
  let timerId;

  const delay = ms ?? 200;

  return function (...args) {
    clearTimeout(timerId);
    cache = args.join("");

    if (leading) {
      fn(cache);
      cache = "";
      leading = false;
      return;
    }

    timerId = setTimeout(() => {
      fn(cache);
      cache = "";
    }, delay);
  };
}

export function throttle(fn, intervalMS) {
  let cache = [];
  let intervalId;
  let delay = intervalMS ?? 100;

  return function (...args) {
    cache = [...cache, ...args];

    args = [];
    clearInterval(intervalId);

    intervalId = setInterval(() => {
      fn(...cache);
      cache = [];
    }, delay);
  };
}

export function capitalise(string, indices = null) {
  // Checks if string is empty, i.e falsy or a different type altogether.
  if (!(string || typeof string === "string")) return;

  // If no complicacies, just return string -> title case
  if (!indices) return string.charAt(0).toUpperCase() + string.slice(1);

  return string
    .split("")
    .map((char, i) => (indices.includes(i) ? char.toUpperCase() : char))
    .join("");
}

//
export default {
  debounce,
  throttle,
  capitalise,
};
