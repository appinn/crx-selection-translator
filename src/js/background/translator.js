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
    var translator = {
        translate: function (query) {
            var engineId = query.engineId || storedSettings.defaultEngine;

            // for test
            // engine = 'baidu';

            if (!hasOwn.call(query, 'to')) {
                query.to = storedSettings.defaultTo;
            }

            var engine = hasOwn.call(engines, engineId) && engines[engineId];

            return engine && engine.translate && engine.translate(query);
        },

        translateWithOtherEngines: function (query) {
            var engineId = query.engineId || storedSettings.defaultEngine;
            var result = [];
            for (var key in engines) {
                if (hasOwn.call(engines, key) && key !== engineId) {
                    var data = $.extend({}, query);
                    data.engineId = key;
                    result.push(translator.translate(data))
                }
            }
            return result;
        }
    };
    return Object.freeze(translator);
});