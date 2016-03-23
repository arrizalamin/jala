var reflector = require('js-function-reflector');

function _toConsumableArray(arr) {
  var arr2 = Array(arr.length);
  if (Array.isArray(arr)) {
    for (var i = 0; i < arr.length; i++) {
      arr2[i] = arr[i];
    } return arr2;
  } else {
    return Array.from(arr);
  }
}

module.exports = function(object) {
  var _len = arguments.length, callbacks = Array(_len > 1 ? _len - 1 : 0);
  for (var _key = 1; _key < _len; _key++) {
    callbacks[_key - 1] = arguments[_key];
  }

  callbacks.forEach(function(callback) {
    var reflection = reflector(callback);
    var args = reflection.args;
    var callbackParams = [];
    for (j in args) {
      var prop = args[j];
      if (typeof prop === 'string') {
        if (typeof object[prop] === 'undefined') {
          return;
        } else {
          callbackParams.push(object[prop])
          continue;
        }
      }
      if (prop[1] instanceof RegExp) {
        if (! prop[1].test(object[prop[0]])) return;
      } else if (prop[1] == 'spread operator') {
        throw new Error('spread operator not supported');
      } else if (prop[1] != object[prop[0]]) {
        return;
      }

      callbackParams.push(object[prop[0]]);
    }
    callback.apply(undefined, _toConsumableArray(callbackParams));
  });
}
