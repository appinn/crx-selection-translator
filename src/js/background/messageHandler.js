define([
    'kernel/runtime',
    'kernel/MessageHandler',
    'kernel/browserAction',
    'kernel/persistent',
    'common/storedSettings',
    'common/iframeSize',
    'background/messageSender',
    'background/translator'
], function (
    runtime,
    MessageHandler,
    browserAction,
    persistent,
    storedSettings,
    iframeSize,
    messageSender,
    translator
) {

    //translator.translate({text: 'since'});
    //translator.translate({text: 'Since content scripts run in the context of a web page and not the extension, they often need some way of communicating with the rest of the extension.'});

    var selectedText;

    var handlers = {
        checkSelectedText: function (data, sender) {
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

        checkEnabledSelection: function (data, sender) {
            var tabId = sender.tab.id;
            messageSender.feedbackSelectionEnabled(tabId, {
                    enabled: storedSettings.enableSelection
                }
            );
        },

        // 点击翻译按钮后，显示 loading 并开始翻译
        showLoading: function (data, sender) {
            var tabId = sender.tab.id;
            messageSender.showLoading(tabId, {
                size: iframeSize.loading
            });
            translate(selectedText, tabId);
        },

        // 利用默认引擎之外的引擎翻译
        translateWithOtherEngines: function (data, sender) {
            var tabId = sender.tab.id;
            data.text = data.text || selectedText;

            translator.translateWithOtherEngines(data)
                .forEach(function (deferred) {
                    deferred && deferred.then(function (result) {
                        messageSender.showOtherResult(tabId, {
                            result: result
                        })
                    });
                });
        }
    };

    function onIconClicked() {
        var enableSelection = storedSettings.enableSelection;
        var title = enableSelection ? '划词翻译已禁用' : '划词翻译已启用';
        var icon = enableSelection ? {
            "19": "images/translate-gray-19x19.png",
            "38": "images/translate-gray-19x19@2x.png"
        } : {
            "19": "images/translate-19x19.png",
            "38": "images/translate-19x19@2x.png"
        };
        browserAction.setTitle(title);
        browserAction.setIcon(icon);
        persistent.set('enableSelection', !enableSelection);
        //messageSender.feedbackSelectionEnabled({
        //    enabled: !enableSelection
        //});
    }


    // Helpers
    // -------
    function translate(text, targetTabId) {
        // 如果翻译引擎设置错误将返回 false
        var deferred = translator.translate({text: text});

        var data = {
            size: iframeSize.result
            //offset: {
            //    left: -20,
            //    top: -20
            //}
        };

        if (deferred) {
            deferred.then(function (result) {
                data.result = result;
                messageSender.showResult(targetTabId, data);
            });
        } else {
            data.result = {error: '未知的翻译引擎'};
            messageSender.showResult(targetTabId, data);
        }
    }


    // 消息处理
    // --------
    runtime.addTabMessageListener(new MessageHandler(handlers, handlers));
    chrome.browserAction.onClicked.addListener(onIconClicked);
});