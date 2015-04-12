(function (root, MessageHandler) {
    'use strict';

    var handlers = {
        showWidget: function (data) {
            data = data || {};
            var widget = root.widget;
            widget.show(data.size);
        },
        showLoading: function (data) {
            data = data || {};
            var widget = root.widget;
            widget.adjust(data.size, data.pos);
        },
        showResult: function (data) {
            console.log(data);
            data = data || {};
            var widget = root.widget;
            widget.adjust(data.size, data.pos);
        }
    };

    runtime.addExtensionMessageListener(new MessageHandler(handlers, handlers));

})(window, MessageHandler);