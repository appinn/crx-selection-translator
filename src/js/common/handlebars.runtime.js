define([
    'handlebars.runtime'
], function (Handlebars) {

    'use strict';

    // handlebars.runtime 为了向 ES6 靠近，返回了一个 default 对象
    // 这里作一层封装，将 default 对象返回
    return Handlebars.default;
});