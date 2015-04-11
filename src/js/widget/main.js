window.require = {
    baseUrl: 'js',
    paths: {
        'jquery': 'lib/jquery',
        'handlebars.runtime': 'lib/handlebars.runtime.amd.min',
        // handlebars 运行时
        'handlebars': 'common/handlebars.runtime'
    },
    deps: [
        'widget/setup',
        'widget/messageHandler'
    ]
};