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

            var showButton = storedSettings.showButton;

            messageSender.showWidget(sender.tab.id, {
                showButton: showButton,
                size: storedSettings.showButton ? iframeSize.button : iframeSize.loading
            });

            // 不显示翻译按钮时，直接开始翻译
            if (!showButton) {
                translator.translate(selectedText);
            }
        },

        // 点击翻译按钮后，显示 loading 并开始翻译
        showLoading: function (data, sender) {
            translator.translate(selectedText);
            messageSender.showLoading(sender.tab.id, {
                size: iframeSize.loading
            });
        }
    };


    // 消息处理
    // --------
    runtime.addTabMessageListener(new MessageHandler(handlers, handlers));
});