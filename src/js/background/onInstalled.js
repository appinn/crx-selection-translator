define([
    'kernel/persistent',
    'common/defaultSettings'
], function (
    persistent,
    defaultSettings
) {
    persistent.clear();
    persistent.set(defaultSettings);
    persistent._print();

    chrome.runtime.onInstalled.addListener(function (details) {
        'use strict';

        var reason = details.reason;
        var isInstall = 'install' === reason;
        var isUpdate = 'update' === reason;

        if (isInstall || (isUpdate && 5 > Number(details.previousVersion.slice(0, 3)))) {
            persistent.set(defaultSettings);
        }

        // 安装时打开设置页
        if (isInstall) {
            chrome.tabs.create({url: '/options.html'});
        }
    });
});