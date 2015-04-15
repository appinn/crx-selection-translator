define([], function () {
    'use strict';

    function status(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        }
        throw new Error(response);
    }

    function json(response) {
        return response.json();
    }

    var base = {
        ajax: function (url, options) {
            return fetch(url, options)
                .then(status)
                .then(json);
        },
        'get': function (url, options) {
            options = options || {};
            options.method = 'get';
            return base.ajax(url, options);
        },
        post: function (url, options) {
            options = options || {};
            options.method = 'get';
            return base.ajax(url, options);
        }
    };

    return Object.freeze(base);
});