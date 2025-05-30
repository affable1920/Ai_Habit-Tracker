export const eventEmitter = {
  events: {},

  on(ev, listener) {
    if (!this.events[ev]) {
      this.events[ev] = [];

      this.events[ev].push(listener);
    }
  },

  emit(ev, data) {
    if (ev in this.events) {
      this.events[ev].forEach((lis) => lis(data));
    }
  },
};

export const debounce = (fn, delay) => {
  let timer;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};
