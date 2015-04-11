define([
    'kernel/MessageHandler'
], function (
    MessageHandler
) {

    var handlers = {
        showWidget: function (data) {
            var size = data.size;
        }
    };

    // 消息处理
    // --------
    var messageHandler = new MessageHandler()
        .addMessageHandler(handlers, handlers);
    // 处理来自背景页的消息
    chrome.extension.onMessage.addListener(function (message, sender, sendResponse) {
        if (!sender || sender.tab || sender.id !== extension.id) {
            return;
        }
        messageHandler.triggerMessage(message, sender, sendResponse);
    });
});