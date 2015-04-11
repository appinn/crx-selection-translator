(function () {
    'use strict';

    var widget = new Widget();
    var handlers = {
        showWidget: function (data) {
            console.log('content')
            console.log(data);
            var size = data.size;
            widget.show(size);
        }
    };

    var messageSender = {
        checkSelection: function (selectedText) {
            extension.sendMessage({
                name: 'checkSelection',
                data: {selectedText: selectedText}
            });
        }
    };

    // Widget
    // ------

    function Widget() {}

    Widget.prototype.getIframe = function () {
        var that = this;
        var iframe = that.iframe;
        if (!iframe) {
            iframe = document.createElement('iframe');
            iframe.id = 'selectionTranslateWidget';
            iframe.src = chrome.runtime.getURL('widget.html');
            that.iframe = iframe;
        }
        return iframe;
    };

    Widget.prototype.show = function (size) {
        var that = this;
        var iframe = that.getIframe();
        iframe.style.left = that.left + 'px';
        iframe.style.top = that.top + 'px';
        if (size) {
            iframe.style.width = (size.width || 0) + 'px';
            iframe.style.height = (size.height || 0) + 'px';
        }
        document.documentElement.appendChild(iframe);

        return that;
    };

    Widget.prototype.hide = function () {
        var that = this;
        var iframe = that.getIframe();
        if (iframe) {
            var parent = iframe.parentNode;
            // 占时从 DOM 中移除，避免对页面的影响
            parent && parent.removeChild(iframe);
            iframe.removeAttribute('style');
        }
        return that;
    };

    Widget.prototype.position = function (pageX, pageY) {
        var that = this;
        that.left = pageX + 50 - window.pageXOffset;
        that.top = pageY + 50 - window.pageYOffset;
        return that;
    };

    // Setup
    // ------
    document.addEventListener('mouseup', onMouseUp, false);
    document.addEventListener('mousedown', onMouseDown, false);

    function onMouseUp(event) {
        // 鼠标左键才触发翻译
        if (event.button !== 0) {
            return;
        }

        var selectedText = getSelectionText();
        if (!selectedText) {
            return;
        }

        widget.position(event.pageX, event.pageY);
        messageSender.checkSelection(selectedText);
        widget.show();
    }

    function onMouseDown() {
        widget.hide();
    }

    //
    // 选中区域后发消息给背景页面，获取 iframe 的大小（根据是否立即翻译），然后显示 iframe
    // 点击翻译按钮后，iframe 发消息给背景页面，让背景页面开始翻译，背景页收到消息后，立即
    // 发一条消息给 content，让 content 调整 iframe 的大小；完成翻译后，由背景页发消息给
    // content 和 iframe，调整 iframe 大小，并显示翻译结果


    // 消息处理
    // --------
    var messageHandler = new MessageHandler()
        .addMessageHandler(handlers, handlers);
    // 处理来自背景页的消息
    //chrome.extension.onMessage.addListener(function (message, sender, sendResponse) {
    //    if (!sender || sender.tab || sender.id !== extension.id) {
    //        return;
    //    }
    //    messageHandler.triggerMessage(message, sender, sendResponse);
    //});

    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        console.log('content received:' + message);
    });


    // Helpers
    // -------

    // 获取选中的文字
    function getSelectionText() {
        return getSelection().toString().trim();
    }

})();