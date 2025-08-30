type EventListener = (...args: any[]) => void;
type EventMap = { [evName: string]: Set<WrappedFn> };

interface WrappedFn extends EventListener {
  _original?: EventListener;
}

class EventEmitter {
  events: EventMap = {};
  constructor() {
    this.events = this.events;
  }

  on(evName: string, listener: EventListener, once = false) {
    if (!this.events[evName]) this.events[evName] = new Set();

    if (typeof listener !== "function") {
      throw new Error("The listener must be a function!");
    }

    const wrapped: WrappedFn = (...args: any[]) => {
      listener(...args);
      if (once) this.off(evName, wrapped);
    };

    wrapped._original = listener;
    this.events[evName].add(wrapped);
  }

  emit(evName: string, ...args: string[]) {
    if (!this.events[evName]) return;
    this.events[evName].forEach((fn) => fn(...args));
  }

  off(evName: string, listener: EventListener) {
    if (!this.events[evName]) return;

    if (typeof listener !== "function") {
      throw new Error("The listener must be a function!");
    }

    this.events[evName].forEach((fn) => {
      if (fn == listener && fn._original == listener) {
        this.events[evName] && this.events[evName].delete(fn);
        return;
      }
    });
  }

  remove(evName: string) {
    if (!this.events[evName]) return;
    delete this.events[evName];
  }
}

const evEmitter = new EventEmitter();
export default evEmitter;
