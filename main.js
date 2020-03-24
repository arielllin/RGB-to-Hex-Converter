//渲染頁面
const container = document.querySelector('.mt-6')
const RGB = ['r', 'g', 'b']

showRange(RGB)

const rangesInput = document.querySelectorAll("input[type='range']")
let mode = ''
let rgbValue = []

//拉桿監聽 //單用change事件無法做到即時顯示value，因此多加了mousemove事件(比一下mousemove vs input)
//試試看有沒有其他做法中
rangesInput.forEach(range => range.addEventListener('mousemove', event => {
  mode = 'range'
  changeInputValue(event.target)
  getAllRgbValue()
  backgrountToShow(rgbValue)
}))

container.addEventListener('change', event => {
  if (event.target.matches("input[type='range']")) {
    mode = 'range'
  } else if (event.target.matches("input[type='text']")) {
    mode = 'rgb-text'
  } 
  changeInputValue(event.target)
  getAllRgbValue()
  backgrountToShow(rgbValue)
})

//text input輸入value，拉桿也要同步顯示
function changeInputValue(data) {
  let result = ''
  if(mode === 'range') {
    result = data.parentElement.nextElementSibling.lastElementChild
  } else if (mode === 'rgb-text') {
    result = data.parentElement.previousElementSibling.lastElementChild
  }
  result.value = event.target.value
}
//取得RGB
function getAllRgbValue(){
  const allItem = [...document.querySelectorAll('.shape-l')]
  
  rgbValue = allItem.map(item => { return item.value})
  rgbToHex(rgbValue)
}
//控制css變數
function backgrountToShow(value){
  document.body.style.setProperty('--chang-background-color', `rgb(${value})`)
}

//RGB轉成Hex
function rgbToHex(rgb){
  const hex = document.querySelector('.hex-input')
  let result = ''
  rgb.forEach(value => {
    result += ('0' + Number(value).toString(16)).slice(-2)
  })
  hex.value = '#' + result
}

//Hex轉成RGB
function hexToRgb(){
  alert('Oops...還不能輸入！')
}

function showRange(data){
  let htmlContain = ''

  data.forEach(item => {
    htmlContain += `
    <form class="col-auto form-inline range">
      <div class="form-group">
        <label class="form-label btn-${item} shape-r">${item.toUpperCase()}</label>
        <input type="range" class="custom-range ml-3 mr-3" value="0" min="0" max="255" data-id="${item}">
      </div>
      <div class="form-group">
        <label class="sr-only">color-r</label>
        <input type="text" class="btn-${item} shape-l ${item}-result" value="0" maxlength="3"></input>
      </div>
    </form>
  `
  })
  htmlContain += `
  <form class="col-auto form-inline color mt-4">
    <input type="text"class="hex-input" placeholder="#" value="#000000"></input>
  </form>
`
  container.innerHTML = htmlContain
}
