class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(ev, listener) {
    if (!this.events[ev]) this.events[ev] = new Set();

    if (typeof listener !== "function") {
      throw new Error("The listener must be a function!");
    }

    this.events[ev].add(listener);
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

    if (this.events[ev].has(listener)) {
      this.events[ev].delete(listener);
    } else {
      throw new Error(`The listener is not registered for the event`);
    }
  }

  remove(ev) {
    if (!this.events[ev]) return;
    delete this.events[ev];
  }
}

const eventEmitter = new EventEmitter();
export default eventEmitter;
