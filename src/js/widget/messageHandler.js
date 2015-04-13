define([
    'kernel/MessageHandler',
    'kernel/runtime',
    'widget/render',
    'widget/messageSender'
], function (
    MessageHandler,
    runtime,
    render,
    messageSender
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
            messageSender.translateWithOtherEngines({engineId: data.result.engineId})
        },

        showOtherResult: function (data) {
            render.renderResult(data);
            console.log(data);
        }
    };

    // 消息处理
    // --------
    runtime.addExtensionMessageListener(new MessageHandler(handlers, handlers));
});