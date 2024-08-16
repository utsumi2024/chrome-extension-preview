chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    chrome.windows.create({
        type: 'popup',
        state: request.ModalSizeOption,
        url: request.url
    });
});