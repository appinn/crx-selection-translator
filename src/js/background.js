window.require = {
    baseUrl: 'js',
    paths: {
        jquery: 'lib/jquery'
    },
    //deps: ['background/messageHandlers']
};

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log(message);
    sendResponse('hello iframe');

    chrome.tabs.sendMessage(sender.tab.id, 'frome background');
});

// 开发者调试时可以看到该信息
console.log('Hi，您是开发者吗？欢迎贡献代码：\nhttps://github.com/bubkoo/crx-selection-translate');
