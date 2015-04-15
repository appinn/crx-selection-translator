// chrome.browserAction
// -----------------
// ref:
//   - http://chrome.liuyixi.com/browserAction.html

(function (root, factory) {
    'use strict';

    if ('function' === typeof define && define.amd) {
        define([], factory);
    } else {
        root.browserAction = factory();
    }

}(window, function () {
    'use strict';

    var browserAction = {

        /* *
         * 设置浏览器图标的标题，显示在工具提示中
         *
         * @method setTitle
         * @param {String} title 当鼠标移到浏览器按钮上时应显示的字符串
         * @param {Number} optional tabId 当选中某一特定标签页时，将更改限制在该标签页内
         * 当该标签页关闭时，更改的内容自动恢复
         * */
        setTitle: function (title, tabId) {
            var details = {
                title: title || ''
            };

            if (tabId) {
                details.tabId = tabId;
            }

            chrome.browserAction.setTitle(details);
        },

        /* *
         * 设置浏览器图标的标题，显示在工具提示中
         *
         * @method getTitle
         * @param {Number} optional tabId 指定要获取标题的标签页
         * 如果没有指定标签页，则返回用于所有标签页的标题
         * @returns {String} 浏览器图标的标题
         * */
        getTitle: function (tabId) {
            var details = {};

            if (tabId) {
                details.tabId = tabId;
            }

            return chrome.browserAction.getTitle(details);
        },

        /* *
         * 设置浏览器按钮的图标。
         * 图标既可以指定为图片文件的路径，也可以指定来自canvas元素的像素数据，
         * 或者这两者中任意一个的词典。path或imageData属性中有且只有一个必须指定。
         *
         * @method setIcon
         * @param {String/Object} image 浏览器按钮的图标
         * @param {Number} isImageData 指定的图标是否是 imageData
         * @param {Number} optional tabId 指定要设置图标的的标签页，如果没有指定标签页，
         * 则返回用于所有标签页的标题
         * @returns {Promise}
         * */
        setIcon: function (image, isImageData, tabId) {
            var details = {};

            isImageData ? details.imageData = image : details.path = image;

            if (tabId) {
                details.tabId = tabId;
            }

            return new Promise(function (resolve, reject) {
                chrome.browserAction.setIcon(details, function () {
                    resolve('');
                });
            });
        },

        /* *
         * 设置当用户单击浏览器按钮时显示为弹出菜单的 HTML 文档
         *
         * @method setPopup
         * @param {String} popup 显示在弹出菜单中的HTML文件。如果设置为空字符串则不弹出菜单
         * @param {Number} optional tabId 指定要设置 popup 的的标签页，如果没有指定标签页，
         * 则返回用于所有标签页的标题
         * */
        setPopup: function (popup, tabId) {
            var details = {popup: popup || ''};

            if (tabId) {
                details.tabId = tabId;
            }

            chrome.browserAction.setPopup(details);
        },

        /* *
         * 获取设置为浏览器按钮弹出内容的 HTML 文档
         *
         * @method getPopup
         * @param {Number} optional tabId 指定要获取弹出内容的标签页。如果没有指定
         * 标签页，则返回用于所有标签页的弹出内容。
         * @returns {Promise}
         * */
        getPopup: function (tabId) {
            var details = {};

            if (tabId) {
                details.tabId = tabId;
            }

            return new Promise(function (resolve, reject) {
                chrome.browserAction.getPopup(details, function (result) {
                    resolve(result);
                });
            });
        },

        /* *
         * 设置浏览器按钮上的文字，显示在图标上
         *
         * @method setBadgeText
         * @param {String} text 可以传入任意数目的字符，但是只有四个左右能够显示得下
         * @param {Number} optional tabId 指定要设置文字的的标签页，如果没有指定标签页，
         * 则返回用于所有标签页的标题
         * */
        setBadgeText: function (text, tabId) {
            var details = {
                text: text || ''
            };

            if (tabId) {
                details.tabId = tabId;
            }

            chrome.browserAction.setBadgeText(details);
        },

        /* *
         * 获取浏览器按钮上的文字，如果没有指定标签页，则返回用于所有标签页的文字
         *
         * @method getBadgeText
         * @param {Number} optional tabId 指定要获取文字的标签页。如果没有指定标签页，
         * 则返回用于所有标签页的文字。
         * @returns {Promise}
         * */
        getBadgeText: function (tabId) {
            var details = {};

            if (tabId) {
                details.tabId = tabId;
            }

            return new Promise(function (resolve, reject) {
                chrome.browserAction.getBadgeText(details, function (result) {
                    resolve(result);
                });
            });
        },

        /* *
         * 设置浏览器按钮上的文字背景颜色
         *
         * @method setBadgeBackgroundColor
         * @param {Array/String} color 含有四个在 [0,255] 范围内的整数的数组，组成文字
         * 的 RGBA 颜色。例如，不透明的红色是 [255, 0, 0, 255]。也可以为CSS形式的字符串，
         * 例如不透明的红色为 #FF0000 或 #F00.
         * @param {Number} optional tabId 指定要设置文字背景色的的标签页，如果没有指定
         * 标签页，则返回用于所有标签页的标题
         * */
        setBadgeBackgroundColor: function (color, tabId) {
            var details = {color: color || ''};

            if (tabId) {
                details.tabId = tabId;
            }

            chrome.browserAction.setBadgeBackgroundColor(details);
        },

        /* *
         * 获取浏览器按钮上的文字背景颜色
         *
         * @method getBadgeBackgroundColor
         * @param {Number} optional tabId 指定要获取文字背景颜色的标签页。如果没有
         * 指定标签页，则返回用于所有标签页的文字背景颜色。
         * @returns {Promise}
         * */
        getBadgeBackgroundColor: function (tabId) {
            var details = {};

            if (tabId) {
                details.tabId = tabId;
            }

            return new Promise(function (resolve, reject) {
                chrome.browserAction.getBadgeBackgroundColor(details, function (colorArray) {
                    resolve(colorArray);
                });
            });
        },

        /* *
         * 为某一标签页启用浏览器按钮。默认情况下，浏览器按钮是启用的
         *
         * @method enable
         * @param {Number} optional tabId 您希望修改浏览器按钮的标签页标识符
         * */
        enable: function (tabId) {
            chrome.browserAction.enable(tabId);
        },

        /* *
         * 为某一标签页禁用浏览器按钮
         *
         * @method disable
         * @param {Number} optional tabId 您希望修改浏览器按钮的标签页标识符
         * */
        disable: function (tabId) {
            chrome.browserAction.disable(tabId);
        }
    };

    return Object.freeze(browserAction);
}));