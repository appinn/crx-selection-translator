define([
    'handlebars.runtime'
], function (Handlebars) {

    'use strict';

    // handlebars.runtime 为了向 ES6 靠近，返回了一个 default 对象
    // 这里作一层封装，将 default 对象返回
    var handlebars = Handlebars.default;


    handlebars.registerHelper('join', function (arr, letter) {
        if (Array.isArray(arr)) {
            letter = typeof letter === 'undefined' ? '' : letter;
            return arr.join(letter);
        } else {
            return arr;
        }
    });

    handlebars.registerHelper('joinObjects', function (arr, key, letter) {
        if (Array.isArray(arr)) {
            letter = typeof letter === 'undefined' ? '' : letter;
            return arr.map(function (item) {
                return item[key];
            }).join(letter);
        } else {
            return arr;
        }
    });

    return handlebars;
});