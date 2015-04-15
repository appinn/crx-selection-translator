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

    var top, left;
    if (pos) {
        left = pos.left;
        top = pos.top;
    } else {
        left = parseInt(iframe.style.left);
        top = parseInt(iframe.style.top);
    }

    pos = getPosition(left, top);
    if (left !== pos.left || !iframe.style.left) {
        iframe.style.left = pos.left + 'px';
    }
    if (top != pos.top || !iframe.style.top) {
        iframe.style.top = pos.top + 'px';
    }

    function getPosition(left, top) {
        var wWidth = window.innerWidth;
        var wHeight = window.innerHeight;
        var width = parseInt(iframe.style.width);
        var height = parseInt(iframe.style.height);

        left += 10;
        top += 10;
        left = left + width < wWidth ? left : wWidth - width;
        top = top + height < wHeight ? top : wHeight - wHeight;

        return {
            left: left,
            top: top
        };
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