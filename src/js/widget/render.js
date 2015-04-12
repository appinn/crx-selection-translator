define([
    'jquery',
    'template/translateButton',
    'template/translateLoading',
    'template/youdaoResult'
], function (
    $,
    buttonTemplate,
    loadingTemplate,
    youdaoResult
) {
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
            $(document.body).html(youdaoResult(data.result));
        }
    };
});