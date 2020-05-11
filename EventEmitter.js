const CALLBACK_TYPES = Object.freeze({
  ON: 'ON',
  ONCE: 'ONCE',
});

const INITIAL_STATE = {};

module.exports = class {
  constructor() {
    this.events = INITIAL_STATE;
    this.isWithOnceCallbacks = false;
  }

  addListener(eventName, listener) {
    return this.on(eventName, listener);
  }

  emit(eventName, ...args) {
    if (eventName in this.events) {
      this.events[eventName].forEach(({ listener }) => listener(...args));

      if (this.isWithOnceCallbacks === true) {
        this.isWithOnceCallbacks = false;
        this.events[eventName] = this.events[eventName].filter(
          ({ type }) => type !== CALLBACK_TYPES.ONCE
        );
      }
      return true;
    }

    return false;
  }

  eventNames() {
    return Object.keys(this.events);
  }

  listenerCount(eventName) {
    return this.events[eventName] ? this.events[eventName].length : -1;
  }

  listeners(eventName) {
    return this.events[eventName]
      ? this.events[eventName].map(({ listener }) => listener)
      : -1;
  }

  off(eventName, listener) {
    return this.removeListener(eventName, listener);
  }

  on(eventName, listener) {
    if (!(eventName in this.events)) {
      this.events[eventName] = [];
    }

    this.events[eventName].push({ listener, type: CALLBACK_TYPES.ON });

    return this;
  }

  once(eventName, listener) {
    if (!(eventName in this.events)) {
      this.events[eventName] = [];
    }

    if (!this.isWithOnceCallbacks) {
      this.isWithOnceCallbacks = true;
    }

    this.events[eventName].push({ listener, type: CALLBACK_TYPES.ONCE });

    return this;
  }

  removeAllListeners(eventName = '') {
    if (eventName) {
      this.events[eventName] = undefined;
    } else {
      this.events = INITIAL_STATE;
    }

    return this;
  }

  removeListener(eventName, eventListener) {
    this.events[eventName] = this.events[eventName].filter(
      ({ listener }) => listener !== eventListener
    );

    if (this.events[eventName].length === 0) {
      this.events[eventName] = undefined;
    }

    return this;
  }
};
