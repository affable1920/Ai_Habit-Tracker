class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(ev, listener) {
    if (!this.events[ev]) this.events[ev] = [];

    if (typeof listener !== "function") {
      throw new Error("The listener must be a function!");
    }

    this.events[ev].push(listener);
  }

  emit(ev, ...args) {
    if (!this.events[ev]) return;
    this.events[ev].forEach((fn) => fn(...args));
  }

  off(ev, listener) {
    if (!this.events[ev]) return;

    if (typeof listener !== "function") {
      throw new Error("The listener must be a function!");
    }

    if (this.events[ev].includes(listener)) {
      this.events[ev].delete(listener);
    } else {
    }
  }

  remove(ev) {
    if (!this.events[ev]) return;
    delete this.events[ev];
  }
}

const evEmitter = new EventEmitter();
export default evEmitter;
