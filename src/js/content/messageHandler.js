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
            data = data || {};
            var widget = root.widget;
            widget.adjust(data.size, data.pos, data.offset);
        },
        feedbackSelectionEnabled: function (data) {
            if (data.enabled) {
                if (!root.widget) {
                    Widget.install();
                }
            } else {
                if (root.widget) {
                    widget.unInstall();
                    root.widget = null;
                }
            }
        }
    };

    runtime.addExtensionMessageListener(new MessageHandler(handlers, handlers));

})(window, MessageHandler);