const sim = document.querySelector('.simple')
const hex = document.querySelector('.hex')
const clk1 = document.querySelector('.clk_btn1')
const clk2 = document.querySelector('.clk_btn2')
const pg1 = document.querySelector('.page1')
const pg2 = document.querySelector('.page2')
const data = document.querySelector('.rgb_data')
const data2 = document.querySelector('.rgb_data2')

const simpleColor = ['red', 'orange', 'yellow', 'green', 'blue', 'navy', 'purple']

sim.addEventListener('click', function () {
  pg1.style.display = 'block'
  pg2.style.display = 'none'
})

hex.addEventListener('click', function () {
  pg1.style.display = 'none'
  pg2.style.display = 'block'
})
let s = []
clk1.addEventListener('click', function () {
  let random = Math.floor(Math.random() * (7 - 0)) + 0;
  
  // 난수로 같은수가 생성되지 않게 막는 코드
  s.push(random)
  if (s[s.length - 2] === s[s.length - 1]) {
    if( random === 6){
      random = 0
      s.splice(-1,1,0)
    }else{
      console.log(s,random)
      random++
      s.splice(-1,1,random)
    }
  }
  if (s.length === 3) {
    s.splice(0,1)
  }
  pg1.style.backgroundColor = simpleColor[random]
  data.textContent = simpleColor[random]
})

clk2.addEventListener('click', function () {
  let random = Math.floor(Math.random()*16777215).toString(16);
  console.log(random)
  pg2.style.backgroundColor = `#${random}`
  data2.textContent = `#${random}`
})