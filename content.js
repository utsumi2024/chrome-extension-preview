document.addEventListener('click', function (event) {
  if (event.shiftKey) {
    const firndUrlResult = FindURLInParents(event.target) // Aタグを含むか捜索する
    if (firndUrlResult.found) { // 見つかった際
      event.preventDefault(); // 既定の動作(別ウィンドウで開く)をOFF

      // URLをアンカーから取得
      const url = firndUrlResult.url

      chrome.runtime.sendMessage({ url: url })
    }

  }
});

// /**
//  * シフトクリックでアンカーを押されたときの関数
//  * @param {*} url 
//  */
// function onClickSiftAnchor(firndUrlResult) {
//   (async () => {

//     // モーダルを表示するエレメントを埋め込み取得する
//     // await putInModelElement();
//     // const $previewModal = document.getElementById('previewModal')

//     // リソースを取得する
//     const [modalElement, urlResource] = await getResources(firndUrlResult.url)


//     // モーダルを埋め込む
//     document.body.insertAdjacentHTML('afterbegin', modalElement)

//     // モーダルのタイトルを設定する
//     const $previewModalLabel = document.getElementById('previewModalLabel')
//     $previewModalLabel.textContent = firndUrlResult.text

//     // モーダルの中身にソースを埋め込む
//     const $ModalSource = document.getElementById('Modal-source')
//     $ModalSource.innerHTML = urlResource

//     // // iframeにurlを埋め込む
//     // const $ModelIframe = document.getElementById('Model-iframe')
//     // $ModelIframe.src = firndUrlResult.url

//     const options = {}
//     const myModalAlternative = new bootstrap.Modal('#previewModal', options)
//     myModalAlternative.show()

//   })()
// }

// /**
//  * 必要なリソースを取得し返す
//  * @returns
//  */
// async function getResources(url) {
//   let retVal = []
//   console.log(url);

//   await Promise.all([
//     fetch(chrome.runtime.getURL('Elements/model.html')).then(response => response.text()),
//     fetch(url).then(response => response.text())
//   ])
//     .then(([modelElement, contentElement]) => {
//       retVal = [modelElement, contentElement]
//     })
//     .catch(error => console.error('Error:', error));

//   return retVal
// }


// async function putInModelElement() {
//   // モーダルを表示し
//   let $previewModal = document.getElementById('previewModal')
//   if (!$previewModal) {

//     // Promise.all([
//     //   fetch('https://api.example.com/data1').then(response => response.json()),
//     //   fetch('https://api.example.com/data2').then(response => response.json())
//     // ])
//     //   .then(([data1, data2]) => {
//     //     console.log('Data1:', data1);
//     //     console.log('Data2:', data2);
//     //   })
//     //   .catch(error => console.error('Error:', error));

//     await Promise.all([
//       fetch(chrome.runtime.getURL('Elements/model.html')).then(response => response.text()),
//       fetch().then(response => response.text())
//     ])
//       .then(([modelElement,contentElement]) => {
//         document.body.insertAdjacentHTML('afterbegin', modelElement)
//       })
//       .catch(error => console.error('Error:', error));
//   }
// }


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
        return new FoundURL(targetElement.href, true, targetElement.textContent)
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

