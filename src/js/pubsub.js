const events = {};

function on(event, callback) {
  let listeners = events[event];

  if (!listeners) {
    listeners = [];
    events[event] = listeners;
  }

  listeners.push({
    callback
  });
}

function off(event, callback = null) {
  if (callback) {
    const listeners = events[event];

    events[event] = listeners.filter(listener => listener.callback !== callback);
  } else {
    events[event] = null;
  }
}

function trigger(event, ...args) {
  const listeners = events[event] || [];

  listeners.forEach(listener => listener.callback(...args));
}

export default {
  on: (event, callback) => on(event, callback),
  off,
  trigger: (event, ...args) => setImmediate(() => trigger(event, ...args))
};