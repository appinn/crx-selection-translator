define([
    'jquery'
], function (
    $
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

    var ERRORS = {
        // 系统错误码
        52001: '查询超时，请调整文本字符长度。',
        52002: '翻译系统错误。',
        52003: '未授权的用户。',
        5004: 'from 或 to 或query 三个必填参数，请检查是否相关参数未填写完整。',

        // 自定义错误信息
        90001: '查询超时，请稍后重试。',
        90002: '网络错误，请检查您的网络设置，然后重试。',
        90003: '翻译服务器返回了错误的数据，请稍后重试。'
    };

    function standardize(response, query) {
        var ret = {};

        //如果有错误码则直接处理错误
        if (response.error_code) {
            ret.error = ERRORS[response.error_code];
        } else {
            ret.to = response.to;
            ret.from = response.from;
            ret.response = response;
            ret.resultURI = config.resultURI
                .replace('{{query}}', query.text)
                .replace('{{to}}', response.to);

            var resultArr = response.trans_result;

            if (Array.isArray(resultArr)) {
                /*
                 * 翻译结果在 trans_result 数组中，每个数组元素都是一个对象
                 * 每个对象包含属性 src（段落的查询文本）和 dst（对应段落的翻译结果）
                 * 有多少个段落，就会有多少个数组元素
                 * 使用 \n 把它们拼起来
                 */
                ret.result = resultArr.map(function (item) {
                    return item.dst;
                }).join('\n');
            } else {
                ret.result = ERRORS['90003'];
            }
        }

        return ret;
    }

    return Object.freeze({
        id: 'baidu',
        name: '百度翻译',
        url: 'http://fanyi.baidu.com/',

        translate: function (query) {
            var data = $.extend({}, config.data);
            data.q = query.text;
            data.to = LANGUAGES[query.to] || 'auto';

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
                    result = {error: ERRORS['90003']};
                } else {
                    result = standardize(response, query);
                }

                result.response = response;
                return result;
            }, function (jqXHR, textStatus) {
                var message;
                if ('timeout' === textStatus) {
                    message = ERRORS['90001'];
                } else if ('error' === textStatus) {
                    message = ERRORS['90002'];
                }

                return {
                    error: message
                };
            });
        }
    });
});