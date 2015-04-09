(function (global, $) {

    var singleton;

    function Widget(settings) {
        if (!singleton) {
            singleton = this;
        }
        return singleton;
    }

    global.Widget = Widget;

})(window, jQuery);