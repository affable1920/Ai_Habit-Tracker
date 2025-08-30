interface WrappedFn extends Function {
  _original?: Function;
}

class EventEmitter {
  events: { [key: string]: Set<WrappedFn> };
  constructor() {
    this.events = {};
  }

  on(ev: string, listener: Function, once = false) {
    if (!this.events[ev]) this.events[ev] = new Set();

    if (typeof listener !== "function") {
      throw new Error("The listener must be a function!");
    }

    const wrapped: WrappedFn = (...args: any[]) => {
      listener(...args);
      if (once) this.off(ev, wrapped);
    };

    wrapped._original = listener;
    this.events[ev].add(wrapped);
  }

  emit(ev: string, ...args: string[]) {
    if (!this.events[ev]) return;
    this.events[ev].forEach((fn) => fn(...args));
  }

  off(ev: string, listener: Function) {
    if (!this.events[ev]) return;

    if (typeof listener !== "function") {
      throw new Error("The listener must be a function!");
    }

    this.events[ev].forEach((fn) => {
      if (fn == listener && fn._original == listener) {
        this.events[ev] && this.events[ev].delete(fn);
        return;
      }
    });
  }

  remove(ev: string) {
    if (!this.events[ev]) return;
    delete this.events[ev];
  }
}

const evEmitter = new EventEmitter();
export default evEmitter;
