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
            console.log('mousedown');
        })
        .on('mouseup', function (e) {
            // 判断是否显示
            console.log('mouseup');

            widget || (widget = new Widget());

        });

    // Helpers
    // -------

    // 获取选中的文字
    function getSelectionText() {
        return getSelection().toString().trim();
    }


})(jQuery);