define([
    'kernel/MessageHandler',
    'widget/render'
], function (
    MessageHandler,
    render
) {

    console.log('iframe loaded');

    var handlers = {
        showWidget: function (data) {
            console.log('iframe')
            console.log(data);
            data.showButton
                ? render.renderButton()
                : render.renderLoading();
        }
    };

    // 消息处理
    // --------
    var messageHandler = new MessageHandler(handlers, handlers);
    // 处理来自背景页的消息
    //chrome.extension.onMessage.addListener(function (message, sender, sendResponse) {
    //    if (!sender || sender.tab || sender.id !== extension.id) {
    //        return;
    //    }
    //    messageHandler.triggerMessage(message, sender, sendResponse);
    //});

    chrome.runtime.sendMessage('hello', function (response) {
        console.log(response);
    });

    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        console.log('iframe received:' + message);
    });
});