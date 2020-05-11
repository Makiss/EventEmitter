const LISTENER_TYPES = Object.freeze({
  ON: 'ON',
  ONCE: 'ONCE',
});

class EventEmitter {
  constructor() {
    this._events = {};
    this._isWithOnceCallbacks = false;
  }

  addListener(eventName, listener) {
    return this.on(eventName, listener);
  }

  emit(eventName, ...args) {
    if (eventName in this._events) {
      this._events[eventName].forEach(({ listener }) => listener(...args));

      if (this._isWithOnceCallbacks === true) {
        this._isWithOnceCallbacks = false;
        this._events[eventName] = this._events[eventName].filter(
          ({ type }) => type !== LISTENER_TYPES.ONCE
        );
      }
      return true;
    }

    return false;
  }

  eventNames() {
    return Object.keys(this._events);
  }

  listenerCount(eventName) {
    return this._events[eventName] ? this._events[eventName].length : -1;
  }

  listeners(eventName) {
    return this._events[eventName]
      ? this._events[eventName].map(({ listener }) => listener)
      : -1;
  }

  off(eventName, listener) {
    return this.removeListener(eventName, listener);
  }

  on(eventName, listener) {
    if (!(eventName in this._events)) {
      this._events[eventName] = [];
    }

    this._addListener(eventName, listener, LISTENER_TYPES.ON);

    return this;
  }

  once(eventName, listener) {
    if (!(eventName in this._events)) {
      this._events[eventName] = [];
    }

    if (!this._isWithOnceCallbacks) {
      this._isWithOnceCallbacks = true;
    }

    this._addListener(eventName, listener, LISTENER_TYPES.ONCE);

    return this;
  }

  removeAllListeners(eventName = '') {
    if (eventName) {
      this._resetListenersForEvent(eventName);
    } else {
      this._events = {};
    }

    return this;
  }

  removeListener(eventName, eventListener) {
    this._events[eventName] = this._events[eventName].filter(
      ({ listener }) => listener !== eventListener
    );

    if (this._events[eventName].length === 0) {
      this._resetListenersForEvent(eventName);
    }

    return this;
  }

  _addListener(eventName, listener, listenerType) {
    this._events[eventName].push({ listener, type: listenerType });
  }

  _resetListenersForEvent(eventName) {
    this._events[eventName] = undefined;
  }
}

module.exports = EventEmitter;
