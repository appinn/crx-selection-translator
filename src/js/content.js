(function ($) {
    //function getSelectionText() {
    //    return getSelection().toString().trim();
    //}
    //
    //var selectionTimer;
    //var isMouseDown = false;
    //
    //$(document)
    //    .on('selectionchange', function () {
    //        if (selectionTimer) {
    //            clearTimeout(selectionTimer);
    //            selectionTimer = -1;
    //        }
    //
    //        if (isMouseDown) {
    //            return;
    //        }
    //
    //        selectionTimer = setTimeout(function () {
    //            console.log(isMouseDown);
    //            if (!isMouseDown) {
    //                $(window).trigger('selectionEnd');
    //            }
    //        }, 500);
    //    })
    //    .on('mousedown', function () {
    //        isMouseDown = true;
    //    })
    //    .on('mouseup', function () {
    //        isMouseDown = false;
    //    });
    //
    //$(window).on('selectionEnd', function () {
    //    selectionTimer = -1;
    //    var selectedText = getSelectionText();
    //
    //    console.log(selectedText);
    //});

    function Widget(settings) {
        var _this = this;
        var iframe = document.createElement('iframe');
        iframe.id = 'selectionTranslateWidget';

        //iframe.addEventListener("load", function () {
        //    Browser.sendToExtension(
        //        {
        //            name: "bounce",
        //            message: {
        //                name: "gt_setKeyboardHandlers",
        //                handlers: p,
        //                enabled: l
        //            }
        //        });
        //    v++;
        //    0 < s.length && 2 === v && (toggleCoordinator(s[0], s[1], s[2]), s = []);
        //    window.focus()
        //});

        iframe.src = chrome.runtime.getURL('widget.html');
        document.documentElement.appendChild(iframe);
    }

    $.extend(Widget.prototype, {

        show: function () {

        },

        hide: function () {

        },

        destroy: function () {

        }
    });

    // Setup
    // ------

    var widget;
    $(document)
        .on('mousedown', function (e) {
            // 隐藏
        })
        .on('mouseup', onMouseUp);

    function onMouseUp(event) {
        // 鼠标左键才触发翻译
        if (event.button !== 0) {
            return;
        }

        var selectedText = getSelectionText();

        // 没有选中任何内容
        if (!selectedText) {
            return;
        }

        extension.sendMessage({
            name: 'checkSelection',
            data: {selectedText: selectedText}
        });

        widget || (widget = new Widget());
    }

    //
    // 选中区域后发消息给背景页面，获取 iframe 的大小（根据是否立即翻译），然后显示 iframe
    // 点击翻译按钮后，iframe 发消息给背景页面，让背景页面开始翻译，背景页收到消息后，立即
    // 发一条消息给 content，让 content 调整 iframe 的大小；完成翻译后，由背景页发消息给
    // content 和 iframe，调整 iframe 大小，并显示翻译结果


    // Helpers
    // -------

    // 获取选中的文字
    function getSelectionText() {
        return getSelection().toString().trim();
    }

    //chrome.extension.sendMessage("内容页面发送的消息", function (response) {
    //    console.log(response);
    //});
    //
    //chrome.extension.onMessage.addListener(
    //    function (request, sender, sendResponse) {
    //        console.log(request);
    //        console.log(sender)
    //        console.log(sender.tab ?
    //        "from a content script:" + sender.tab.url :
    //            "from the extension");
    //    });
})(jQuery);