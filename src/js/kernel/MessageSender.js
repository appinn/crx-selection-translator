(function (root, factory) {
    'use strict';

    if ('function' === typeof define && define.amd) {
        define(['kernel/runtime', 'kernel/tabs'], factory);
    } else {
        root.MessageSender = factory(root.runtime, root.tabs);
    }

}(window, function (runtime, tabs) {
    'use strict';

    var splitter = /\s+/;
    var toString = Object.prototype.toString;

    function MessageSender(messageNames, toTab) {
        var that = this;

        if (typeof messageNames === 'string') {
            messageNames = messageNames.split(splitter);
        }

        if (toString.call(messageNames) !== '[object Array]') {
            return;
        }

        for (var i = 0, l = messageNames.length; i < l; i++) {
            (function (messageName) {
                that[messageName] = toTab === true ?
                    function (tabId, data) {
                        tabs.sendMessage(tabId, {
                            name: messageName,
                            data: data
                        });
                    } :
                    function (data) {
                        runtime.sendMessage({
                            name: messageName,
                            data: data
                        });
                    };

            })(messageNames[i]);
        }
    }

    return MessageSender;
}));