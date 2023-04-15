const patterns = [
  {in: 'a', out: 'ai'},
  {in:'e', out: 'enter'},
  {in: 'i', out: 'imes'},
  {in: 'o', out: 'ober'},
  {in: 'u', out: 'ufat'},
]

const encryptButton = document.querySelector("#btn-encrypt")
const decryptButton = document.querySelector("#btn-decrypt")

const copyButton = document.createElement("button")
copyButton.id = "btn-copy"
copyButton.innerHTML = "Copiar"
const resultDiv = document.createElement("div")
const resultText = document.createElement("p")
resultDiv.id = "result"
resultDiv.appendChild(resultText)
resultDiv.appendChild(copyButton)

const containerResult = document.querySelector("#container-result")

function hideResult() {
  const children = containerResult.children
  if (!children[0].classList.contains("hidden")) {
    for (let index = 0; index < children.length; index++) {
      children[index].classList.add("hidden")
    }
  }
}

function encrypt(text) {
  let encryptedText = ""
  textForEncrypt = text.trim().toLowerCase()
  for (let index = 0; index < textForEncrypt.length; index++) {
    const letter = textForEncrypt[index]
    const pattern = patterns.find(pattern => pattern.in === letter)
    if (pattern) {
      encryptedText += pattern.out
    } else {
      encryptedText += letter
    }
  }
  return encryptedText
}

function decrypt(text) {
  let decryptedText = ""
  textForDecrypt = text.trim().toLowerCase()
  for (let index = 0; index < textForDecrypt.length; index++) {
    const letter = textForDecrypt[index]
    const pattern = patterns.find(pattern => pattern.out === letter)
    if (pattern) {
      decryptedText += pattern.in
    } else {
      decryptedText += letter
    }
  }
  return decryptedText
}

function onEncryptClick() {
  hideResult()
  resultText.innerHTML = encrypt(text.value)
  containerResult.appendChild(resultDiv)
}

function onDecryptClick() {
  if (text.value !== "") {
    hideResult()
    resultText.innerHTML = decrypt(text.value)
    containerResult.appendChild(resultDiv)
  }
}

function copyToClipboard() {
  const text = resultText.innerHTML
  const clipboard = navigator.clipboard
  clipboard.writeText(text)
  .then(() => {
    console.log('Texto copiado para a área de transferência');
    alert("Texto copiado para a área de transferência")
  })
  .catch((error) => {
    console.error('Erro ao copiar texto para a área de transferência:', error);
    alert("Erro ao copiar texto para a área de transferência")
  });
}

encryptButton.addEventListener("click", onEncryptClick)
decryptButton.addEventListener("click", onDecryptClick)
copyButton.addEventListener("click", copyToClipboard)
