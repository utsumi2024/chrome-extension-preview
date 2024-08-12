chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // 詳細はchrome.windows.createで検索
    chrome.windows.create({
        type: 'popup',
        state: 'maximized',
        url: request.url
    });
});