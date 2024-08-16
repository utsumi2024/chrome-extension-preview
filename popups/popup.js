const $radios = [...document.querySelectorAll('input[type=radio][name=ModalSizeOption]')]

// ラジオボタン初期化処理
// const defaultCheckedTarget = localStorage.ModalSizeOption ?? $radios.find((e) => e.checked).value
// $radios.find((e) => e.value == defaultCheckedTarget).checked = true

// ラジオボタン初期化処理
chrome.storage.local.get(['ModalSizeOption'], (values) => {
    const defaultCheckedTarget = values.ModalSizeOption ?? $radios.find((e) => e.checked).value
    $radios.find((e) => e.value == defaultCheckedTarget).checked = true
})

// 保存処理
const $saveButtons = [...document.querySelectorAll(".js-Save")]
$saveButtons.map(element =>
    element.addEventListener('click', (e) => {
        // localStorage.setItem('ModalSizeOption', $radios.find( (e) => e.checked).value)
        chrome.storage.local.set({ ModalSizeOption: $radios.find((e) => e.checked).value });
    })
)

// リセット処理 
const $resetButtons = [...document.querySelectorAll(".js-Reset")]
$resetButtons.map(element =>
    element.addEventListener('click', (e) => {
        // localStorage.clear();
        chrome.storage.local.clear();
    })
)