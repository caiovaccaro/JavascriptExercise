import Q from 'q'

var Mediator = (function() {
  var subscribe = function(channel, fn){
    if (!Mediator.channels[channel]) Mediator.channels[channel] = [];
    Mediator.channels[channel].push({ context: this, callback: fn });
    return this;
  },

  publish = function(channel){
    if (!Mediator.channels[channel]) return false;
    var deferred = Q.defer(),
      args = Array.prototype.slice.call(arguments, 1),
      callbacks = []

    for (var i = 0, l = Mediator.channels[channel].length; i < l; i++) {
      var subscription = Mediator.channels[channel][i];
      callbacks.push(subscription.callback.apply(subscription.context, args));
    }

    Q.all(callbacks).then(function(result) {
      deferred.resolve(result)
    })

    return deferred.promise
  };

  return {
    channels: {},
    publish: publish,
    subscribe: subscribe
  };
}());

export default Mediator;