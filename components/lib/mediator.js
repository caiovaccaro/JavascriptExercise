var Mediator = (function() {
    var subscribe = function(channel, fn){
        if (!Mediator.channels[channel]) Mediator.channels[channel] = [];
        Mediator.channels[channel].push({ context: this, callback: fn });
        return this;
    },
 
    publish = function(channel){
        if (!Mediator.channels[channel]) return false;
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0, l = Mediator.channels[channel].length; i < l; i++) {
            var subscription = Mediator.channels[channel][i];
            subscription.callback.apply(subscription.context, args);
        }
        return this;
    };
 
    return {
        channels: {},
        publish: publish,
        subscribe: subscribe
    };
}());

export default Mediator;