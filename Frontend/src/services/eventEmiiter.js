class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(ev, listener, once = false) {
    console.log("on called.");
    if (!this.events[ev]) this.events[ev] = new Set();

    if (typeof listener !== "function") {
      throw new Error("The listener must be a function!");
    }

    const wrapped = (...args) => {
      listener(...args);
      if (once) this.off(wrapped);
    };

    wrapped._original = listener;
    this.events[ev].add(wrapped);
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

    this.events[ev].forEach((fn) => {
      if (fn == listener && fn._original == listener) {
        this.events[ev].delete(fn);
        return;
      }
    });
  }

  remove(ev) {
    if (!this.events[ev]) return;
    delete this.events[ev];
  }
}

const evEmitter = new EventEmitter();
export default evEmitter;
