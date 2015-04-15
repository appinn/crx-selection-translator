(function (root) {
    'use strict';

    // 说明：
    // content 页面中的 window 对象与实际页面中的 window 对象是不同对象，所以可以不用
    // 太担心命名冲突的问题；同时，content 页面的脚本只能配置在 manifest 文件中，不能
    // 通过 requireJs 等方式进行模块化，只能通过 命名空间的方式进行模块化。

    var messageSender = root.messageSender;

    // Setup
    // ------

    document.addEventListener('mouseup', onMouseUp, false);
    document.addEventListener('mousedown', onMouseDown, false);
    messageSender.checkEnabledSelection(); // 检查是否开始划词翻译

    function onMouseUp(event) {
        // 鼠标左键才触发翻译
        if (event.button !== 0) {
            return;
        }

        // 防止单击时，选中的文本还没有被取消选择，而翻译按钮（翻译结果）再次弹出
        setTimeout(function () {
            var selectedText = getSelectionText();
            if (!selectedText) {
                return;
            }

            Widget.install();

            root.widget.offset(event.pageX, event.pageY);
            messageSender.checkSelectedText({selectedText: selectedText});
        }, 10);
    }

    function onMouseDown() {
        root.widget && root.widget.hide();
    }


    // Helpers
    // -------

    // 获取选中的文字
    function getSelectionText() {
        return getSelection().toString().trim();
    }

})(window);