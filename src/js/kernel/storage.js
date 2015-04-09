(function (root, factory) {
    'use strict';

    if ('function' === typeof define && define.amd) {
        define([], factory);
    } else {
        root.storage = factory();
    }

}(window, function () {
    'use strict';

    var storageArea = chrome.storage.sync;
    var changeCallbacks = [];
    var hasOwn = Object.prototype.hasOwnProperty;

    var storage = {
        /* *
         * 读取数据
         *
         * @method get
         * @param {Mixed} keys `keys` 可以是字符串、包含多个字符串的数组或对象。如果
         * `keys` 是字符串，则和 localStorage` 的用法类似；如果是数组，则相当于一次读
         * 取了多个数据；如果 `keys` 是对象，则会先读取以这个对象属性名为键值的数据，如果
         * 这个数据不存在则返回 `keys` 对象的属性值（比如 `keys` 为 `{'name':'Billy'}`，
         * 如果 `name` 这个值存在，就返回 `name` 原有的值，如果不存在就返回 `Billy`）。
         * 如果 `keys` 为一个空数组（`[]`）或空对象（`{}`），则返回一个空列表，如果
         * `keys` 为 `null`，则返回所有存储的数据。
         * @returns {Deferred} Promise
         * */
        get: function (keys) {
            return new Promise(function (resolve, reject) {
                storageArea.get(keys, function (result) {
                    var error = chrome.runtime.lastError;
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });
        },

        /* *
         * 获取一个数据或多个数据所占用的总空间
         *
         * @method getBytesInUse
         * @param {Object} items `items` 的属性值如果是字符型、数字型和数组型，则储存
         * 的格式不会改变，但如果是对象型和函数型的，会被储存为'{}'，如果是日期型和正则型，
         * 会被储存为它们的字符串形式。
         * @returns {Deferred} Promise 数据所占的字节
         * */
        getBytesInUse: function (items) {
            return new Promise(function (resolve, reject) {
                storageArea.getBytesInUse(items, function (bytes) {
                    var error = chrome.runtime.lastError;
                    if (error) {
                        reject(error);
                    } else {
                        resolve(bytes);
                    }
                });
            });
        },

        /* *
         * 写入数据，`items` 的属性值如果是字符型、数字型和数组型，则储存的格式不会改变，
         * 但如果是对象型和函数型的，会被储存为'{}'，如果是日期型和正则型，会被储存为它们
         * 的字符串形式。
         *
         * @method set
         * @param {Object/String} key
         * @param {String} value
         * @returns {Deferred} Promise
         * */
        set: function (key, value) {
            var items;
            if (2 === arguments.length) {
                items = {};
                items[key] = value;
            } else {
                items = key || {};
            }

            return new Promise(function (resolve, reject) {
                storageArea.set(items, function () {
                    var err = chrome.runtime.lastError;
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        },

        /* *
         * 删除数据
         *
         * @method remove
         * @param {Array/String} keys 字符串或多个字符串的数组
         * @returns {Deferred} Promise
         * */
        remove: function (keys) {
            return new Promise(function (resolve, reject) {
                storageArea.remove(keys, function () {
                    var err = chrome.runtime.lastError;
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        },

        /* *
         * 删除所有数据
         *
         * @method clear
         * @returns {Deferred} Promise
         * */
        clear: function () {
            return new Promise(function (resolve, reject) {
                storageArea.clear(function () {
                    var err = chrome.runtime.lastError;
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        },

        /* *
         * 打印储存区域的所有数据
         *
         * @private
         * @method _print
         * */
        _print: function () {
            // keys 为 null 时，获取所有项
            this.get(null).then(function (result) {
                console.log(result);
            });
        },

        /* *
         * 注册 change 事件
         * @method onChange
         *   注意，回调里面的第一个参数仅包含最新值，
         *   而不是一个有newValue和oldValue的对象。
         *   见下面的事件监听函数
         * @param {function} listener
         * @param {object=} caseOf 关心哪些设置。
         *            如果changes里面没有任何一个在 caseOf 对象里列出的 key ，就不会触发事件
         * @returns {persistence}
         * */
        onChange: function (listener, keys) {
            var callback;
            if ('undefined' === typeof keys) {
                keys = [];
            } else if ('string' === typeof keys) {
                keys = [keys];
            }
            if (keys && keys.length) {
                callback = function (changes) {
                    var meaningfulChanges;

                    for (var key in changes) {
                        if (!hasOwn.call(changes, key) || keys.indexOf(key) === -1) {
                            continue;
                        }
                        meaningfulChanges = meaningfulChanges || {};
                        meaningfulChanges[key] = changes[key];
                    }

                    if (meaningfulChanges) {
                        listener(meaningfulChanges);
                    }
                };
            } else {
                callback = listener;
            }
            changeCallbacks.push(callback);
            return this;
        }
    };

    // 当存储区的数据发生改变时，这个事件会被激发。
    // `changes` 是对象，键为更改的属性名称，值包含两个属性，分别为 `oldValue` 和 `newValue`。
    // `StorageArea` 为 `local` 或 `sync`。
    chrome.storage.onChanged.addListener(function (changes, areaName) {
        if (storageArea !== chrome.storage[areaName]) {
            return;
        }

        var customChanges = {};
        for (var key in changes) {
            if (!hasOwn.call(changes, key)) {
                continue;
            }
            customChanges[key] = changes[key];
        }

        // 防止对象在回调里被修改，因为这会导致其它回调也收到修改后的对象
        Object.freeze(customChanges);

        changeCallbacks.forEach(function (callback) {
            callback(customChanges);
        });
    });

    return Object.freeze(storage);
}));