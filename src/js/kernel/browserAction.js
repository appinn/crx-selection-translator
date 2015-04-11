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
}));