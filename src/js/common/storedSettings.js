define([
    'jquery',
    'common/defaultSettings',
    'kernel/persistent'
], function (
    $,
    defaultSettings,
    persistent
) {

    'use strict';

    var storedSettings = {};

    persistent.get(null).then(function (result) {
        $.extend(true, storedSettings, defaultSettings, result);
    });

    persistent.onChange(function (changes) {
        $.extend(true, storedSettings, changes);
    });

    return storedSettings;
});