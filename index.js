const EventEmitter = require('./EventEmitter');

const myEmitter = new EventEmitter();
const callback1 = () => console.log('Callback 1');
const callback2 = () => console.log('Callback 2');

myEmitter.addListener('event', callback1).on('event', callback2);
myEmitter.on('event', () => console.log('Callback 3'));
myEmitter.on('event', () => console.log('Callback 4'));
myEmitter.on('event', () => console.log('Callback 5'));
myEmitter.on('event', (...args) => console.log(args));
myEmitter.once('event', () => console.log('Called once!'));

myEmitter.on('event2', (...args) => console.log(args));

console.log('event', myEmitter.listenerCount('event'));
console.log('event', myEmitter.listeners('event'));
console.log('event2', myEmitter.listenerCount('event2'));
console.log('event2', myEmitter.listeners('event2'));
console.log(myEmitter.eventNames());

myEmitter.emit('event', 'Hello, Event Emitter!');
myEmitter.emit('event2', 'Hello!');

myEmitter.off('event', callback1);
myEmitter.removeListener('event', callback2);

console.log('event', myEmitter.listenerCount('event'));
console.log('event', myEmitter.listeners('event'));
console.log('event2', myEmitter.listenerCount('event2'));
console.log('event2', myEmitter.listeners('event2'));

myEmitter.emit('event', 'Hello, Event Emitter!');
myEmitter.emit('event2', 'Hello!');

myEmitter.removeAllListeners('event');
console.log('event', myEmitter.listenerCount('event'));
console.log('event', myEmitter.listeners('event'));
console.log('event2', myEmitter.listenerCount('event2'));
console.log('event2', myEmitter.listeners('event2'));
console.log(myEmitter.eventNames());
myEmitter.removeAllListeners();
console.log('event2', myEmitter.listenerCount('event2'));
console.log('event2', myEmitter.listeners('event2'));
console.log(myEmitter.eventNames());
