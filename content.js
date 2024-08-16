document.addEventListener('click', function (event) {
  if (event.shiftKey) {
    const anchor = event.target.closest("a")
    if (anchor !== null) {
      if (anchor.tagName === 'A') {
        if (anchor.href) {
          event.preventDefault(); // 既定の動作(別ウィンドウで開く)をOFF

          // URLをアンカーから取得
          const url = anchor.href

          chrome.storage.local.get(['ModalSizeOption'], (values) => {
            chrome.runtime.sendMessage({ url: url, ModalSizeOption: values.ModalSizeOption ?? 'normal' })
          })

        }
      }
    }
  }
});
