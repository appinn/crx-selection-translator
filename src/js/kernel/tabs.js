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
        get: function (tabId) {
            return new Promise(function (resolve, reject) {
                chrome.tabs.get(tabId, function (tab) {
                    var error = chrome.extension.lastError;
                    error ? reject(error) : resolve(tab);
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

        /* *
         * 向内容页或注入到页面的 iframe 发送消息
         *
         * @method sendMessage
         * @param {String} tabId 标签 id
         * @param {Any} message 消息内容
         * @returns {Promise}
         * */
        sendMessage: function (tabId, message) {
            return new Promise(function (resolve, reject) {
                chrome.tabs.sendMessage(tabId, message, function (response) {
                    var error = chrome.extension.lastError;
                    error ? reject(error) : resolve(response);
                });
            });
        }
    };

    return Object.freeze(tabs);
}));