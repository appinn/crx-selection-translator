// 百度翻译引擎
// -----------------
// ref:
//   - http://developer.baidu.com/wiki/index.php?title=%E5%B8%AE%E5%8A%A9%E6%96%87%E6%A1%A3%E9%A6%96%E9%A1%B5/%E7%99%BE%E5%BA%A6%E7%BF%BB%E8%AF%91/%E7%BF%BB%E8%AF%91API

define([
    'jquery',
    'engine/commonErrors'
], function (
    $,
    commonErrors
) {
    'use strict';

    var config = {
        url: 'http://openapi.baidu.com/public/2.0/bmt/translate',
        method: 'GET',
        data: {
            // 开发者在百度开发者中心注册得到的授权 API key
            client_id: '5gXtD5Dt7ocs5rQA5k8FFfQu',
            // 源语言语种：语言代码或 auto
            from: 'auto',
            // 目标语言语种：语言代码或 auto
            to: 'auto',
            // 待翻译内容，该字段必须为 UTF-8 编码，并且以 GET 方式调用 API 时，需要进行 urlencode 编码
            q: ''
        },
        // 打开百度翻译页面
        resultURI: 'http://fanyi.baidu.com/#auto/{{to}}/{{query}}'
    };

    var LANGUAGES = {
        zh: 'zh',   // 中文
        en: 'en',   // 英语
        jp: 'jp',   // 日语
        kor: 'kor', // 韩语
        spa: 'spa', // 西班牙语
        fra: 'fra', // 法语
        th: 'th',   // 泰语
        ara: 'ara', // 阿拉伯语
        ru: 'ru',   // 俄罗斯语
        pt: 'pt',   // 葡萄牙语
        yue: 'yue', // 粤语
        wyw: 'wyw', // 文言文
        de: 'de',   // 德语
        it: 'it',   // 意大利语
        nl: 'nl',   // 荷兰语
        el: 'el',   // 希腊语
        auto: 'auto'
    };

    var ERRORS = $.extend({
        // 系统错误码
        52001: '查询超时，请调整文本字符长度。',
        52002: '翻译系统错误。',
        52003: '未授权的用户。',
        5004: 'from 或 to 或query 三个必填参数，请检查是否相关参数未填写完整。'
    }, commonErrors);

    var engine = {
        id: 'baidu',
        name: '百度翻译',
        url: 'http://fanyi.baidu.com/',

        translate: function (query) {
            var queryText = query.text;
            var data = $.extend({}, config.data);

            data.q = queryText;
            data.to = LANGUAGES[query.to] || LANGUAGES['auto'];

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
                    result = response.error_code ? // 翻译引擎错误
                    {error: ERRORS[response.error_code]} :
                        !Array.isArray(response.trans_result) ? // 返回格式错误
                        {error: ERRORS.FORMAT} : {
                            to: response.to,
                            from: response.from,
                            data: response.trans_result
                        };
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
                result.engineId = engine.id;
                result.engineName = engine.name;

                // 要翻译的文本
                result.query = queryText;

                // 结果页
                result.resultURI = config.resultURI
                    .replace('{{query}}', queryText)
                    .replace('{{to}}', result.to);

                return result;
            });
        }
    };


    // Exports
    // -------
    return Object.freeze(engine);
});