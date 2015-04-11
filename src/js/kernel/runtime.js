// chrome.runtime
// -----------------
// ref:
//   - https://developer.chrome.com/extensions/runtime
//   - http://chrome.liuyixi.com/runtime.html


(function (root, factory) {
    'use strict';

    if ('function' === typeof define && define.amd) {
        define([], factory);
    } else {
        root.runtime = factory();
    }

}(window, function () {
    'use strict';

    var runtime = {
        // 扩展或应用的 ID
        id: chrome.runtime.id,
        // 扩展或应用的完整根路径
        baseURI: chrome.runtime.getURL(''),

        /* *
         * 获取扩展或应用 backgroundPage 的 window 对象
         *
         * @method getBackgroundPage
         * */
        getBackgroundPage: function () {
            return new Promise(function (resolve) {
                chrome.runtime.getBackgroundPage(function (backgroundPage) {
                    resolve(backgroundPage);
                });
            });
        },

        /* *
         * 打开选项页面 Since Chrome 42
         *
         * @method openOptionsPage
         * */
        openOptionsPage: function () {
            return new Promise(function (resolve, reject) {
                chrome.runtime.openOptionsPage(function () {
                    var error = chrome.runtime.lastError;
                    error ? reject(error) : resolve();
                });
            });
        },

        /* *
         * 获取完整的被序列化的 manifest 文件内容
         *
         * @method getManifest
         * @returns {Object} manifest 内容
         * */
        getManifest: function () {
            return chrome.runtime.getManifest();
        },

        /* *
         * 将一个相对扩展或应用根目录的相对路径转换为完全路径
         *
         * @method getURL
         * @param {String} path 扩展或应用中的资源路径
         * @returns {String} 完整路径
         * */
        getURL: function (path) {
            var fullPath = this.baseURI;

            if (path && 'string' === typeof path) {
                fullPath += path[0] === '/' ? path.substr(1) : path;
            }

            return fullPath;
        },

        /* *
         * 重新加载扩展或应用 Since Chrome 25.
         *
         * @method reload
         * */
        reload: function () {
            return chrome.runtime.reload();
        },

        /* *
         * 检查扩展或应用的更新
         *
         * @method requestUpdateCheck
         * @returns {Promise}
         * */
        requestUpdateCheck: function () {
            return new Promise(function (resolve) {
                chrome.runtime.requestUpdateCheck(function (status, details) {
                    resolve({
                        status: status,
                        details: details
                    });
                });
            });
        },

        /* *
         * Restart the ChromeOS device when the app runs in kiosk mode.
         * Otherwise, it's no-op.
         *
         * @method restart
         * */
        restart: function () {
            return chrome.runtime.restart();
        },

        /* *
         * 向扩展或应用发送消息 Since Chrome 26.
         *
         * @method sendMessage
         * @param {String} extensionId 扩展或应用的 ID，省略时表示发送给自己
         * @param {Any} message 消息内容
         * @returns {Promise}
         * */
        sendMessage: function (extensionId, message, options) {
            var argsCount = arguments.length;
            if (!argsCount) {
                return;
            }

            var hasExtensionId = argsCount === 2;

            if (argsCount === 1) {
                message = extensionId;
            }

            return new Promise(function (resolve, reject) {
                function cb(response) {
                    var error = chrome.runtime.lastError;
                    error ? reject(error) : resolve(response);
                }

                hasExtensionId
                    ? chrome.runtime.sendMessage(extensionId, message, cb)
                    : chrome.runtime.sendMessage(message, cb);
            });
        },

        /* *
         * Returns information about the current platform
         *
         * @method getPlatformInfo
         * */
        getPlatformInfo: function () {
            return new Promise(function (resolve) {
                chrome.runtime.getPlatformInfo(function (platformInfo) {
                    resolve(platformInfo);
                });
            });
        },

        /* *
         * Returns a DirectoryEntry for the package directory
         *
         * @method getPackageDirectoryEntry
         * */
        getPackageDirectoryEntry: function () {
            return new Promise(function (resolve) {
                chrome.runtime.getPackageDirectoryEntry(function (directoryEntry) {
                    resolve(directoryEntry);
                });
            });
        },

        // 以下方法非原生方法
        // ------
        _addMessageListener: function (messageHandler, isFromTab) {
            if (!messageHandler || !messageHandler.triggerMessage) {
                return;
            }

            var extensionId = this.id;

            chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
                // 这里只接受来自本插件的消息，其他消息将忽略
                if (!sender || sender.id !== extensionId) {
                    return;
                }

                if ((isFromTab === true && !sender.tab) || (isFromTab === false && sender.tab)) {
                    return;
                }

                messageHandler.triggerMessage(message, sender, sendResponse);
            });


        },

        addExtensionMessageListener: function (messageHandler) {
            this._addMessageListener(messageHandler, false)
        },

        // 添加 tab 发送的消息的监听
        addTabMessageListener: function (messageHandler) {
            this._addMessageListener(messageHandler, true)
        }
    };

    return Object.freeze(runtime);
}));