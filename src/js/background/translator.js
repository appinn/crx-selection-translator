define([
    'common/storedSettings',
    'engine/baidu',
    'engine/youdao',
    'engine/google-en',
    'engine/google-cn'
], function (
    storedSettings
) {
    'use strict';

    var engines = {};
    Array.prototype.slice.call(arguments, 1).forEach(function (engine) {
        engines[engine.id] = engine;
    });


    var hasOwn = Object.prototype.hasOwnProperty;

    return Object.freeze({

        translate: function (query) {
            var engine = query.engine || storedSettings.defaultEngine;

            if (!hasOwn.call(query, 'to')) {
                query.to = storedSettings.defaultTo;
            }

            return hasOwn.call(engines, engine) && engines[engine].translate(query);
        }
    });
});