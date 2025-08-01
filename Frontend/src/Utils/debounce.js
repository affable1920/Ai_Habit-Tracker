function debounce(func, delay) {
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

export default debounce;
