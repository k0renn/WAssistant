const loadQr = async () => {
  const response = await window.loader.loadQr()
  // console.log(response)
  document.getElementById('qr').src = 'data:image/png;base64,' + response
}

console.log('Index Loaded')

loadQr()