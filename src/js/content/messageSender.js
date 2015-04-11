(function (root, MessageSender) {
    'use strict';

    root.messageSender = new MessageSender([
        'checkSelection' // 检查所选文字是否能翻译
    ]);

})(window, MessageSender);