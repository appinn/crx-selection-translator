// Google 翻译引擎
// -----------------
// ref:
//   - https://translate.google.cn

// https://translate.google.cn/translate_a/single?
//   client=t&   //
//   sl=auto&    // source language
//   tl=zh-CN&   // to language
//   hl=zh-CN&
//   dt=bd&
//   dt=ex&
//   dt=ld&
//   dt=md&
//   dt=qca&
//   dt=rw&
//   dt=rm&
//   dt=ss&
//   dt=t&
//   dt=at&
//   ie=UTF-8&   // input encode
//   oe=UTF-8&   // output encode
//   pc=1&
//   otf=1&
//   srcrom=0&
//   ssel=0&
//   tsel=0&
//   tk=519228|354321&
//   q=run

define([
    'jquery',
    'engine/commonErrors'
], function (
    $,
    commonErrors
) {
    'use strict';

    var config = {
        method: 'GET',
        url: 'https://translate.google.cn/translate_a/single',
        data: {
            client: 'gtx',
            sl: 'auto', // 源语言
            tl: 'auto', // 目标语言
            hl: 'zh-CN',
            dt: [ // 定义返回的数据结果项
                'bd',     // dict 翻译单词时用到，单词的详细解释
                // 'ex',  // examples
                // 'ld',  //
                // 'md',  // definitions
                // 'qca',
                // 'rw',  // related_words 短语
                // 'rm',
                // 'ss',  // synsets 同义词
                't'       // sentences 翻译句子或段落时需要
                // 'at'   // alternative
            ],
            ie: 'UTF-8',
            oe: 'UTF-8',
            dj: 1,
            source: 'icon',
            q: ''
        },

        resultURI: 'https://translate.google.cn/#{{from}}/{{to}}/{{query}}'
    };

    var ERRORS = $.extend({}, commonErrors);
    var engine = {
        id: 'googleCN',
        name: '谷歌翻译',
        link: 'https://translate.google.cn/',

        translate: function (query) {
            var queryText = query.text;
            var data = $.extend({}, config.data);

            data.q = queryText;
            data.tl = query.to || 'auto';

            return $.ajax({
                url: config.url,
                type: config.method,
                data: $.param(data, true), // 格式化数组参数
                timeout: 4000
            }).then(function (response) {
                var result;
                // 谷歌(国内)翻译发生了一个错误，可能是因为查询文本过长造成的。
                if ('string' === typeof response) {
                    result = {error: ERRORS.FORMAT};
                } else {

                    result = {
                        from: response.src,
                        data: response
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
                result.to = query.to;

                // 结果页
                result.resultURI = config.resultURI
                    .replace('{{from}}', result.from)
                    .replace('{{to}}', result.to)
                    .replace('{{query}}', queryText);
                return result;
            });
        }
    };

    // Exports
    // -------
    return Object.freeze(engine);
});