define([
    'jquery',
    'widget/messageSender'
], function (
    $,
    messageSender
) {
    'use strict';

    var bind = Function.prototype.bind;

    // 禁用右键菜单
    document.oncontextmenu = function () {
        event.returnValue = false;
    };

    $(document)
        .on('click', '.btn-translate', bind.call(messageSender.showLoading, messageSender, {}));
});