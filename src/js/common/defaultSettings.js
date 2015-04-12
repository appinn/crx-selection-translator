define([], function () {
    return {
        enableSelection: true,  // 是否开启划词翻译
        autoTranslate: false,   // 划词后是否自动开始翻译，否则显示翻译按钮，点击之后才开始翻译
        autoPlay: false,        // 翻译之后是否自动阅读单词或短语
        ignoreChinese: false,   // 是否忽略中文
        ignoreNumLike: true,    // 忽略类纯数字组合，即由 数字、横线、点、括号、反括号 组成的
        needCtrl: false,        // 是否需要配合 Ctrl 键使用
        waitingText: '正在翻译，请稍候…', // 翻译过程中的文本
        contextMenu: true,          // 是否显示右键菜单
        defaultEngine: 'youdao',    // 默认的翻译引擎
        defaultSpeaker: 'google',   // 默认朗读引擎
        defaultTo: 'auto'           // 默认翻译为
    }
});