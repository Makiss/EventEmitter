const EventEmitter = require('../EventEmitter');

const callback = jest.fn();
let myEmitter = null;

beforeEach(() => {
  myEmitter = new EventEmitter();
});

describe('EventEmitter', () => {
  describe('sets listener for given event', () => {
    test('with addListener method', () => {
      const returnedValue = myEmitter.addListener('event', callback);

      expect(myEmitter._events.event).not.toBeUndefined();
      expect(myEmitter._events.event).toHaveLength(1);
      expect(myEmitter._events.event[0].listener).toEqual(callback);
      expect(returnedValue).toBeInstanceOf(EventEmitter);
    });

    test('with on method', () => {
      const returnedValue = myEmitter.on('event', callback);

      expect(myEmitter._events.event).not.toBeUndefined();
      expect(myEmitter._events.event).toHaveLength(1);
      expect(myEmitter._events.event[0].listener).toEqual(callback);
      expect(returnedValue).toBeInstanceOf(EventEmitter);
    });

    test('with once method', () => {
      const returnedValue = myEmitter.once('event', callback);

      expect(myEmitter._events.event).not.toBeUndefined();
      expect(myEmitter._events.event).toHaveLength(1);
      expect(myEmitter._events.event[0].listener).toEqual(callback);
      expect(returnedValue).toBeInstanceOf(EventEmitter);
    });
  });

  describe('given event listener', () => {
    beforeAll(() => {
      myEmitter.on('event', callback);
    });

    beforeEach(() => {
      !myEmitter._events.event && myEmitter.on('event', callback);
    });

    describe('emit method', () => {
      test('works for existent event', () => {
        const emit = jest.fn(() => myEmitter.emit('event', 'test'));
        emit();

        expect(callback).toHaveBeenCalledWith('test');
        expect(emit).toHaveReturnedWith(true);
      });

      test('does not work for nonexistent event', () => {
        const emit = jest.fn(() => myEmitter.emit('event2', 'test'));
        emit();

        expect(emit).toHaveReturnedWith(false);
      });

      test('calls callback for event set up with once method for one time only', () => {
        const callbackOnce = jest.fn();
        myEmitter.once('event', callbackOnce);
        myEmitter.emit('event');
        myEmitter.emit('event');

        expect(callbackOnce).toHaveBeenCalledTimes(1);
      });
    });

    describe('listenerCount method', () => {
      test('returns listener count for existent event', () => {
        const listenerCount = jest.fn(() => myEmitter.listenerCount('event'));
        listenerCount();

        expect(listenerCount).toHaveReturnedWith(1);
      });

      test('returns -1 for nonexistent event', () => {
        const listenerCount = jest.fn(() => myEmitter.listenerCount('event2'));
        listenerCount();

        expect(listenerCount).toHaveReturnedWith(-1);
      });
    });

    describe('listeners method', () => {
      test('returns array of callbacks for given event', () => {
        const listeners = jest.fn(() => myEmitter.listeners('event'));
        listeners();

        expect(listeners).toHaveReturnedWith([callback]);
      });

      test('returns -1 for nonexistent event', () => {
        const listeners = jest.fn(() => myEmitter.listeners('event2'));
        listeners();

        expect(listeners).toHaveReturnedWith(-1);
      });
    });

    describe('removeAllListeners method', () => {
      test('clears listeners for given event', () => {
        const returnedValue = myEmitter.removeAllListeners('event');

        expect(myEmitter._events.event).toBeUndefined();
        expect(returnedValue).toBeInstanceOf(EventEmitter);
      });

      test('clears all events', () => {
        const returnedValue = myEmitter.removeAllListeners();

        expect(myEmitter._events).toMatchObject({});
        expect(returnedValue).toBeInstanceOf(EventEmitter);
      });
    });

    test('returns event names', () => {
      const eventNames = jest.fn(() => myEmitter.eventNames());
      eventNames();

      expect(eventNames).toHaveReturnedWith(['event']);
    });

    describe('unsets listener for given event', () => {
      test('with off method', () => {
        const returnedValue = myEmitter.off('event', callback);

        expect(myEmitter._events.event).toBeUndefined();
        expect(returnedValue).toBeInstanceOf(EventEmitter);
      });

      test('with removeListener method', () => {
        const returnedValue = myEmitter.removeListener('event', callback);

        expect(myEmitter._events.event).toBeUndefined();
        expect(returnedValue).toBeInstanceOf(EventEmitter);
      });
    });
  });
});
