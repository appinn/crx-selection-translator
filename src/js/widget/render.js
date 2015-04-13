define([
    'jquery',
    'template/translateButton',
    'template/translateLoading',
    'template/translateResult',
    'template/youdao',
    'template/baidu',
    'template/google-cn'
], function (
    $,
    buttonTemplate,
    loadingTemplate,
    translateResult,
    youdaoTemplate,
    baiduTemplate,
    googleCNTemplate
) {

    var hasOwn = Object.prototype.hasOwnProperty;
    var engineTemplates = {
        'youdao': youdaoTemplate,
        'baidu': baiduTemplate,
        'google': googleCNTemplate
    };


    return {
        clear: function () {
            $(document.body).empty();
        },

        renderButton: function () {
            $(document.body).html(buttonTemplate());
        },

        renderLoading: function () {
            $(document.body).html(loadingTemplate());
        },

        renderResult: function (data) {
            var result = data && data.result;
            if (!result || !result.engineId) {
                return;
            }

            var $content = $('.inside');
            if (!$content.length) {
                $(document.body).html(translateResult());
                $content = $('.inside');
            }

            var engineId = result.engineId;

            if (!hasOwn.call(engineTemplates, engineId)) {
                return;
            }

            var html = engineTemplates[engineId](result);
            var $engineResult = $content.find('#' + engineId + 'Wrap');
            $engineResult.length
                ? $engineResult.replaceWith(html)
                : $content.append(html)
        }
    };
});