(function (root, MessageSender) {
    'use strict';

    root.messageSender = new MessageSender([
        'checkSelectedText',    // 检查所选文字是否能翻译
        'checkEnabledSelection' // 检查是否启用划词翻译
    ]);

})(window, MessageSender);