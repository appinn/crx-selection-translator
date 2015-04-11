// chrome.tabs
// -----------------
// ref:
//   - http://chrome.liuyixi.com/tabs.html

(function (root, factory) {
    'use strict';

    if ('function' === typeof define && define.amd) {
        define([], factory);
    } else {
        root.tabs = factory();
    }

}(window, function () {
    'use strict';

    var tabs = {
        /* *
         * 获取一个标签页对象
         *
         * @method get
         * @param {Number} tabId 标签页 Id
         * @returns {Object} 标签页对象
         * */
        get: function (tabId) {
            return new Promise(function (resolve) {
                chrome.tabs.get(tabId, function (tab) {
                    resolve(tab);
                });
            });
        },

        /* *
         * 获取该方法被调用时所在的标签页对象，在 background  和 popup 中时返回 undefined
         *
         * @method getCurrent
         * @returns {Object} 标签页对象
         * */
        getCurrent: function () {
            return new Promise(function (resolve) {
                chrome.tabs.getCurrent(function (tab) {
                    resolve(tab);
                });
            });
        },

        query: function (queryInfo) {
            return new Promise(function (resolve, reject) {
                chrome.tabs.query(queryInfo, function (tabs) {
                    var error = chrome.extension.lastError;
                    error ? reject(error) : resolve(tabs);
                });
            });
        },

        getSelected: function () {
            return this.query({active: true});
        },

        getAllInWindow: function (windowId) {
            return this.query({windowId: windowId});
        },

        /* *
         * 向内容页或注入到页面的 iframe 发送消息
         *
         * @method sendMessage
         * @param {String} tabId 标签 id
         * @param {Any} message 消息内容
         * @returns {Promise}
         * */
        sendMessage: function (tabId, message, options) {
            return new Promise(function (resolve, reject) {
                function cb(response) {
                    var error = chrome.extension.lastError;
                    error ? reject(error) : resolve(response);
                }

                options
                    ? chrome.tabs.sendMessage(tabId, message, options, cb)
                    : chrome.tabs.sendMessage(tabId, message, cb);
            });
        }
    };

    return Object.freeze(tabs);
}));