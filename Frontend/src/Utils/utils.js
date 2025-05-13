const eventEmitter = {
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

export default eventEmitter;
