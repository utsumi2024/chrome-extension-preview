
/**
 * ドキュメントクリック時の操作
 */
document.addEventListener('click', function (event) {
  // シフトクリック
  if (event.shiftKey) {
    // Aタグを含むか捜索する
    const firndUrlResult = FindURLInParents(event.target)
    if (firndUrlResult.found) {
      event.preventDefault(); // 既定の動作(別ウィンドウで開くをOFF)

      // URLをアンカーから取得
      const url = firndUrlResult.url
      onClickSiftAnchor(firndUrlResult)
    }

  }
});

/**
 * シフトクリックでアンカーを押されたときの関数
 * @param {*} url 
 */
function onClickSiftAnchor(firndUrlResult) {
  (async () => {

    // モーダルを表示するエレメントを埋め込み取得する
    await putInModelElement();
    const $previewModal = document.getElementById('previewModal')

    // モーダルのタイトルを設定する
    const $previewModalLabel = document.getElementById('previewModalLabel')
    previewModalLabel.textContent = firndUrlResult.text

    // iframeにurlを埋め込む
    const $ModelIframe = document.getElementById('Model-iframe')
    $ModelIframe.src = firndUrlResult.url

    const options = {}
    const myModalAlternative = new bootstrap.Modal('#previewModal', options)
    myModalAlternative.show()

  })()
}

async function putInModelElement() {
  // モーダルを表示し
  let $previewModal = document.getElementById('previewModal')
  if (!$previewModal) {
    
    // Promise.all([
    //   fetch('https://api.example.com/data1').then(response => response.json()),
    //   fetch('https://api.example.com/data2').then(response => response.json())
    // ])
    //   .then(([data1, data2]) => {
    //     console.log('Data1:', data1);
    //     console.log('Data2:', data2);
    //   })
    //   .catch(error => console.error('Error:', error));

    await Promise.all([
      fetch(chrome.runtime.getURL('Elements/model.html')).then(response => response.text())
    ])
      .then(([modelElement]) => {
        document.body.insertAdjacentHTML('afterbegin', modelElement)
      })
      .catch(error => console.error('Error:', error));
  }
}


/**
 * 子要素を引数に取り、親要素をさかのぼってAタグが含まれるかを探します
 * Aタグが含まれる場合foundプロパティがTrueに設定されたfoundURLクラスを返します。
 * Aタグが含まれない場合foundプロパティがFalseに設定されたfoundURLクラスを返します。
 * @param {*} targetChild 子要素を引数に取ります 
 */
function FindURLInParents(targetChild) {
  let targetElement = targetChild
  while (targetElement && targetElement !== document) {
    if (targetElement.href) {
      if (targetElement.tagName === 'A') {
        return new FoundURL(targetElement.href, true,targetElement.textContent)
      }
    }
    targetElement = targetElement.parentElement;
  }
  return new FoundURL(null, false)
}

class FoundURL {
  constructor(url, found, text = "") {
    this.url = url
    this.found = found
    this.text = text
  }
}

