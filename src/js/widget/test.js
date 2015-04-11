define([], function () {

    console.log('test')

    chrome.extension.sendMessage("内容页 iframe 发送的消息", function (response) {
        console.log(response);
    });

    chrome.extension.onMessage.addListener(
        function (request, sender, sendResponse) {
            console.log(request);
            console.log(sender)

            console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
                "from the extension");
        });
});