export function debounce(
  fn: (arg: string | string[]) => void,
  ms: number,
  { leading = false } = {}
) {
  let cache = "";
  let timerId: number;

  const delay = ms ?? 200;

  return function (...args: string[]) {
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

export function throttle(
  fn: (arg: string | string[]) => void,
  intervalMS: number
) {
  let cache: Array<string> = [];
  let intervalId: number;
  let delay = intervalMS ?? 100;

  return function (...args: string[]) {
    cache = [...cache, ...args];

    args = [];
    clearInterval(intervalId);

    intervalId = setInterval(() => {
      fn(cache);
      cache = [];
    }, delay);
  };
}

export function capitalise(string: string, indices: number[]) {
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
