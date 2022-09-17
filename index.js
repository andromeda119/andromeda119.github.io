const prev = document.getElementById('prev')
const next = document.getElementById('next')
const img = document.getElementById('img')
img.crossOrigin = 'anonymous'

const imgs = ['img1.jpg','img2.jpg','img3.jpg','img4.png']
let num = 0
const Xthreshold = 120
const Yrestraint = 100
const maxTime = 300
let startTime = null
let elapsedTime = null
let startX = null
let startY = null
let distX = null
let distY = null

for(let i=0;i<imgs.length;i++){
  const span = document.createElement('span')
  span.setAttribute('class','dot ' + i)
  span.style.height = '10px'
  span.style.width = '10px'
  span.style.backgroundColor = 'darkgrey'
  span.style.borderRadius = '50%'
  document.getElementById('dots').appendChild(span)
}

const dots = document.getElementsByClassName('dot')

img.src = imgs[num]
dots[num].style.backgroundColor = 'lightgrey'

function prevImg(){
  const previous = num
  if(num == 0)
    num = imgs.length-1
  else
    num--
  img.src = imgs[num]
  dots[num].style.backgroundColor = 'lightgrey'
  dots[previous].style.backgroundColor = 'darkgrey'
}


function nextImg(){
  const current = num
  if(num == imgs.length-1)
    num = 0
  else
    num++
  img.src = imgs[num]
  dots[num].style.backgroundColor = 'lightgrey'
  dots[current].style.backgroundColor = 'darkgrey'
}

prev.addEventListener('click',(e)=>{
  prevImg()
  e.preventDefault()
})

next.addEventListener('click',(e)=>{
  nextImg()
  e.preventDefault()
})

img.addEventListener('touchstart',(e)=>{
  startX = e.changedTouches[0].pageX
  startY = e.changedTouches[0].pageY
  startTime = new Date().getTime()
  e.preventDefault()
},false)

img.addEventListener('touchend',(e)=>{
  distX = e.changedTouches[0].pageX - startX
  distY = e.changedTouches[0].pageY - startY
  elapsedTime = (new Date()).getTime() - startTime
  
  if(elapsedTime <= maxTime){
    if(Math.abs(distX) >= Xthreshold && Math.abs(distY) <= Yrestraint){
      if(distX < 0)
        nextImg()
      else
        prevImg()
    }
  }
  e.preventDefault()
},false)