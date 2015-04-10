(function ($) {

    new Widget();

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

})(jQuery);