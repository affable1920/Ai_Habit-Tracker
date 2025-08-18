export function debounce(func, delay) {
  if (typeof func !== "function") {
    throw new Error("Expected a function !");
  }

  let safeDelay = Math.max(0, parseInt(delay, 10) || 0);
  let timer;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), safeDelay);
  };
}

export function capitalise(str, indices = null) {
  if (!isStr(str)) return;

  const wrapperFn = () => {
    if (!indices) return str.charAt(0).toUpperCase() + str.slice(1);
    const capitalisedStr = [...str].map((char, i) =>
      indices.includes(i) ? char.toUpperCase() : char
    );

    return capitalisedStr.join("");
  };

  return wrapperFn();
}

//
function isStr(str) {
  return typeof str === "string";
}
