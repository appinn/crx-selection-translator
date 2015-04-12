define([
    'kernel/runtime',
    'kernel/MessageHandler',
    'common/storedSettings',
    'common/iframeSize',
    'background/messageSender',
    'background/translator'
], function (
    runtime,
    MessageHandler,
    storedSettings,
    iframeSize,
    messageSender,
    translator
) {

    var selectedText;

    var handlers = {
        checkSelection: function (data, sender) {
            if (!data || !data.selectedText || !storedSettings.enableSelection) {
                return;
            }

            // TODO: 做检查，看选中文本是否能翻译
            var canTranslate = true;

            if (!canTranslate) {
                return;
            }

            // 缓存选中的文本
            selectedText = data.selectedText;

            var tabId = sender.tab.id;
            var autoTranslate = storedSettings.autoTranslate;

            messageSender.showWidget(tabId, {
                autoTranslate: autoTranslate,
                size: autoTranslate ? iframeSize.loading : iframeSize.button
            });

            // 不显示翻译按钮时，直接开始翻译
            autoTranslate && translate(selectedText, tabId);
        },

        // 点击翻译按钮后，显示 loading 并开始翻译
        showLoading: function (data, sender) {
            var tabId = sender.tab.id;
            messageSender.showLoading(tabId, {
                size: iframeSize.loading
            });
            translate(selectedText, tabId);
        }
    };

    // Helpers
    // -------

    function translate(text, targetTabId) {
        // 如果翻译引擎设置错误将返回 false
        var deferred = translator.translate({text: text});
        deferred ? deferred.then(function (result) {
            messageSender.showResult(targetTabId, {
                result: result,
                size: iframeSize.result
            })
        }) : messageSender.showResult(targetTabId, {
            result: {error: '未知的翻译引擎'},
            size: iframeSize.result
        });
    }

    // 消息处理
    // --------
    runtime.addTabMessageListener(new MessageHandler(handlers, handlers));
});