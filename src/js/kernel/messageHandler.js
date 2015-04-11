(function (root, factory) {
    'use strict';

    if ('function' === typeof define && define.amd) {
        define([], factory);
    } else {
        root.MessageHandler = factory();
    }

}(window, function () {
    'use strict';

    function MessageHandler() {}

    MessageHandler.prototype.addMessageHandler = function (eventNames, callback, context) {
        var that = this;

        if (!arguments.length) {
            return that;
        }

        var formatted = standardize(eventNames, callback, context);

        if (!formatted) {
            return;
        }

        if (!that._messageHandlers) {
            that._messageHandlers = {};
        }

        var cached = that._messageHandlers;
        var handlers = formatted.handlers;
        context = formatted.context;

        for (var eventName in handlers) {
            if (!hasOwn.call(handlers, eventName)) {
                continue;
            }

            if (!cached[eventName]) {
                cached[eventName] = [];
            }

            cached[eventName].push(handlers[eventName], context);
        }

        return that;
    };

    MessageHandler.prototype.addOneTimeMessageHandler = function (eventNames, callback, context) {
        var that = this;

        if (!arguments.length) {
            return that;
        }

        var formatted = standardize(eventNames, callback, context);

        if (!formatted) {
            return;
        }

        var handlers = formatted.handlers;
        context = formatted.context;

        for (var eventName in handlers) {
            if (!hasOwn.call(handlers, eventName)) {
                continue;
            }

            handlers[eventName] = (function (eventName, handler) {
                return function cb() {
                    that.removeMessageHandler(eventName, cb);
                    handler.apply(context, arguments);
                };
            })(eventName, handlers[eventName]);
        }

        return that.addMessageHandler(handlers);
    };

    MessageHandler.prototype.removeMessageHandler = function (eventNames, callback, context) {
        var that = this;

        if (!handlers) {
            return that;
        }

        // remove all
        if (!arguments.length) {
            delete that._messageHandlers;
            return that;
        }

        var type = typeof eventNames;
        if ('string' === type) {
            eventNames = eventNames.split(eventSplitter);
        } else if ('object' === type) {
            for (var eventName in eventNames) {
                if (!hasOwn.call(eventNames, eventName)) {
                    continue;
                }
                that.removeMessageHandler(eventName, eventNames[eventName], callback);
            }
        } else { // eventNames 为 falsly
            eventNames = Object.keys(that._messageHandlers);
        }

        var cached = that._messageHandlers;
        while (eventName = eventNames.shift()) {
            var handlers = cached[eventName];

            if (!handlers) {
                continue;
            }

            if (!(callback || context)) {
                delete cached[eventName];
                continue;
            }

            for (var i = handlers.length - 2; i >= 0; i -= 2) {
                if (!(callback && handlers[i] !== callback ||
                    context && handlers[i + 1] !== context)) {
                    handlers.splice(i, 2)
                }
            }
        }

        return that;
    };

    MessageHandler.prototype.triggerMessage = function (message /*, sender */ /*, sendResponse */) {

        var that = this;
        var cached = this._messageHandlers;
        var eventName = message.name;

        if (!cached || !eventName) {
            return that;
        }

        var args = slice.call(arguments, 1);
        var all = cached['*'];
        var handlers = cached[eventName];

        args.unshift(message.data);
        all && (all = slice.call(all));
        handlers && (handlers = slice.call(handlers));

        triggerEvents(handlers, args, that);
        triggerEvents(all, args, that);

        return that;
    };

    // Helpers
    // -------

    var eventSplitter = /\s+/;
    var hasOwn = Object.prototype.hasOwnProperty;
    var slice = Array.prototype.slice;

    function standardize(eventNames, callback, context) {
        var handlers;
        var type = typeof eventNames;
        if ('string' === type) {
            if ('function' !== typeof callback) {
                return;
            }

            handlers = {};
            eventNames.split(eventSplitter).forEach(function (eventName) {
                handlers[eventName] = callback;
            });

        } else if ('object' === type) {
            handlers = eventNames;
            context = callback;
        } else if ('function' === type) {
            // * 匹配所有消息
            handlers = {'*': eventNames};
            context = callback;
        } else {
            return;
        }

        return {
            handlers: handlers,
            context: context
        }

    }

    function triggerEvents(handlers, args, context) {
        if (handlers) {
            var i = 0;
            var l = handlers.length;
            var a1 = args[0];
            var a2 = args[1];
            var a3 = args[2];
            // call is faster than apply, optimize less than 3 argu
            // http://blog.csdn.net/zhengyinhui100/article/details/7837127
            switch (args.length) {
                case 0:
                    for (; i < l; i += 2) {
                        handlers[i].call(handlers[i + 1] || context);
                    }
                    break;
                case 1:
                    for (; i < l; i += 2) {
                        handlers[i].call(handlers[i + 1] || context, a1);
                    }
                    break;
                case 2:
                    for (; i < l; i += 2) {
                        handlers[i].call(handlers[i + 1] || context, a1, a2);
                    }
                    break;
                case 3:
                    for (; i < l; i += 2) {
                        handlers[i].call(handlers[i + 1] || context, a1, a2, a3);
                    }
                    break;
                default:
                    for (; i < l; i += 2) {
                        handlers[i].apply(handlers[i + 1] || context, args);
                    }
                    break;
            }
        }
    }


    // Exports
    // -------

    return MessageHandler;
}));