define([
    'common/storedSettings',
    'kernel/MessageHandler',
    'kernel/tabs'
], function (
    storedSettings,
    MessageHandler,
    tabs
) {

    var handlers = {
        checkSelection: function (data, sender) {
            if (!data || !data.selectedText || !sender || !sender.tab || !storedSettings.enableSelection) {
                return;
            }

            tabs.sendMessage(sender.tab.id, {
                name: 'showWidget',
                data: {
                    showButton: storedSettings.showButton
                }
            });
        }
    };


    // Setup
    // ------
    var messageHandler = new MessageHandler();

    messageHandler.addMessageHandler(handlers, handlers);

    // 处理来自内容页或嵌入页面的 iframe 的消息
    chrome.extension.onMessage.addListener(function (message, sender, sendResponse) {
        if (!sender || !sender.tab) {
            return;
        }
        messageHandler.triggerMessage(message, sender, sendResponse);
    });
});