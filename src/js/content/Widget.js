function Widget() {
    var that = this;
    var iframe = document.createElement('iframe');
    iframe.id = 'selectionTranslatorWidget';
    iframe.src = chrome.runtime.getURL('widget.html');
    that.iframe = iframe;

    return that.install();
}

Widget.prototype.install = function () {
    var that = this;
    // 页面加载之后就将 iframe 放到与 body 平级的位置，
    // 避免每次将 iframe 放入页面后都出发 iframe 页面的重新加载（页面的脚本
    // 会重新运行，浏览器标签页也会出现短暂的 loading 效果）
    document.documentElement.appendChild(that.iframe);
    that.installed = true;
    that.install = function () {};
    return that;
};

Widget.prototype.show = function (size) {
    var that = this;
    that.adjust(size, that.pos);
    return that;
};

Widget.prototype.hide = function () {
    var that = this;
    var iframe = that.iframe;
    iframe.removeAttribute('style');
    return that;
};

Widget.prototype.adjust = function (size, pos) {
    var that = this;
    var iframe = that.iframe;

    var width = size.width || 0;
    var height = size.height || 0;

    if (size) {
        iframe.style.width = width + 'px';
        iframe.style.height = height + 'px';
    }

    // TODO: 判断显示位置，不能超出浏览器的科室范围
    if (pos) {
        iframe.style.left = pos.left + 30 + 'px';
        iframe.style.top = pos.top + 30 + 'px';
    }

    return that;
};

Widget.prototype.offset = function (pageX, pageY) {
    var that = this;
    that.pos = {
        left: pageX - window.pageXOffset,
        top: pageY - window.pageYOffset
    };
    return that;
};