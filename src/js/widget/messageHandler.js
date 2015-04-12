define([
    'kernel/MessageHandler',
    'kernel/runtime',
    'widget/render'
], function (
    MessageHandler,
    runtime,
    render
) {

    var handlers = {
        // 显示翻译按钮或 loading 标志
        showWidget: function (data) {
            data.autoTranslate
                ? render.renderLoading()
                : render.renderButton();
        },
        showLoading: function () {
            render.renderLoading();
        },
        showResult: function (data) {
            render.renderResult(data);
        }
    };

    // 消息处理
    // --------
    runtime.addExtensionMessageListener(new MessageHandler(handlers, handlers));
});