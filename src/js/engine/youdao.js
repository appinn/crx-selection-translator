// 有道翻译 API
// -----------------
// ref:
//   - http://fanyi.youdao.com/openapi?path=data-mode

define([
    'jquery',
    'engine/commonErrors'
], function (
    $,
    commonErrors
) {
    'use strict';

    var config = {
        url: 'http://fanyi.youdao.com/openapi.do',
        method: 'GET',

        data: {
            // 网站名称：SelectionTranslate
            // 网站地址：http://bubkoo.com/demo
            keyfrom: "SelectionTranslate",
            key: "61384382",
            type: "data",
            doctype: "json",
            version: "1.1",
            q: ''
        },

        resultURI: 'http://fanyi.youdao.com/translate?i={{query}}'
    };

    var ERRORS = $.extend({
        20: '要翻译的文本过长。',
        30: '无法进行有效的翻译。',
        40: '不支持的语言类型。',
        50: '未授权的用户。',
        60: '无词典结果'
    }, commonErrors);


    var engine = {
        id: 'youdao',
        name: '有道翻译',
        url: 'http://fanyi.youdao.com/',

        translate: function (query) {
            var queryText = query.text;
            var data = $.extend({}, config.data);

            data.q = queryText;

            return $.ajax({
                url: config.url,
                type: config.method,
                data: data,
                timeout: 3000
            }).then(function (response) {
                var result;
                // 如果服务器返回的不是 JSON 格式数据
                // 比如长城宽带会修改返回的内容插入广告
                if ('string' === typeof response) {
                    result = {error: ERRORS.FORMAT};
                } else {
                    result = response.errorCode === 0
                        ? {data: response}
                        : {error: ERRORS[response.errorCode]};
                }

                return result;
            }, function (jqXHR, textStatus) {
                var error = 'timeout' === textStatus
                    ? ERRORS.TIMEOUT : 'error' === textStatus
                    ? ERRORS.NETWORK
                    : ERRORS.UNKNOWN;

                return {
                    error: error
                };
            }).then(function (result) {
                // 翻译引擎
                result.engine = engine.id;

                // 要翻译的文本
                result.query = query.text;
                result.from = query.from;
                result.to = query.to;

                // 结果页
                result.resultURI = config.resultURI.replace('{{query}}', queryText);

                console.log(result);

                return result;
            });
        }
    };

    // Exports
    // -------
    return Object.freeze(engine);
});