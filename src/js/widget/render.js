define([
    'jquery',
    'template/translateButton',
    'template/translateLoading'
], function (
    $,
    buttonTemplate,
    loadingTemplate
) {
    return {
        clear: function () {
            var that = this;
            $(document.body).empty();
            return that;
        },

        renderButton: function () {
            var that = this;
            $(document.body).html(buttonTemplate());
            return that;
        },

        renderLoading: function () {
            var that = this;
            $(document.body).html(loadingTemplate());
            return that;
        },

        renderResult: function (result) {

        }
    };
});