(function (global, $) {

    var singleton;

    function Widget(settings) {
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

        iframe.src = chrome.runtime.getURL("widget.html");

        document.documentElement.appendChild(iframe);
    }

    $.extend(Widget.prototype, {});
    global.Widget = Widget;
})(window, jQuery);