// import Sortable from 'sortablejs'

const addData = document.querySelector('.list-data')
const addBtn = document.querySelector('.add-btn')
const removeAllBtn = document.querySelector('button.remove-all')
const listUl = document.querySelector('.list-main')
const removeBtn = document.querySelectorAll('.remove')

const editModal = document.querySelector('.modal')
const editInput = document.querySelector('.modal > .edit-value')
const editClose = document.querySelector('.modal > .close')
const editSubmit = document.querySelector('.modal > .submit')
const backColor = document.querySelector('.bgc')

let localIndex = 0 // index를 쌓는 변수

renderLocal()

// list 추가 이벤트
addBtn.addEventListener('click', (e) => {
  e.preventDefault()
  renderList(addData.value) // renderList() 매개변수에 value값을 넣어준다.
  addData.value = ''
  findList() // ul.list-main>li 를 모두 찾아주는 함수를 작동시킨다.
})
// list 전체 삭제 이벤트
removeAllBtn.addEventListener('click', (e) => {
  e.preventDefault() // 
  listUl.innerHTML = '' // ul.list-main안에 있는 html 코드를 비워준다.
  window.localStorage.clear() // localStorage를 비워준다.
  localIndex = 0 // index번호를 0으로 초기화 시킨다.
})
// 브라우저를 새로고침하거나, 재시작 할 때 초기 실행함수
function renderLocal (){
  let ls = window.localStorage
  let arr =[]
  for( const key in ls){ // localStorage에 저장되어있는 key값을 찾기 위해 for문
    if(ls.hasOwnProperty(key)) { // for 문을 돌리면 prototype값이 출력되기 때문에 if문
        arr.push([key,ls.getItem(key)]) // 찾은 key값을이용해서 arr이라는 배열변수에 2차원배열로 push
    }
  }
  arr.sort((a,b)=>a[0]-b[0]) // 올림차순으로 arr배열을 정렬한다.
  for( const x of arr ){
    renderList(x[1]) // x[1](value)값을 render해준다.
  }
  ls.clear() // 로컬스토리지를 비운다.
  localIndex = 0 // localIndex를 초기화 시키고
  for(const i of arr){ 
    ls.setItem(localIndex,i[1]) //arr을 순회하면서 로컬에 저장을 해주고
    localIndex++ // localIndex값을 증가
  }
  findList() // ul.list-main>li 를 모두 찾아주는 함수를 작동시킨다.
}
// 리스트를 추가하는 함수
function renderList (list) {
  const createLi = document.createElement('li') //li태그를 만들고 
  createLi.innerHTML = `
  <p>${list}</p>
  <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
  <button class="remove"><i class="fa-solid fa-trash"></i></button>`
  listUl.append(createLi)
  localStorage.setItem(localIndex,list)
  localIndex++
}

function findList() {
  let removeBtn = document.querySelectorAll('ul.list-main > li > button.remove')
  let editBtn = document.querySelectorAll('ul.list-main > li > button.edit')
  let findListIndex = document.querySelectorAll('ul.list-main > li')

  removeBtn.forEach((e,index) => { // button.remove 을 모두 순회하고 분류
    e.onclick = () => { // 클릭이 된 button.remove가 있다면
    findListIndex[index].remove() // 브라우저 화면상에서 li의 인덱스를 찾아서 지운다.
    window.localStorage.removeItem(index) // 로컬스토리지 내에서도 index키값을 지운다.
    }
  })

  editBtn.forEach((e,index) => { 
    e.onclick = () => {
      let listP = findListIndex[index].querySelector('p')
      editBack('visible')
      editInput.focus()
      editInput.value = listP.textContent
      editClose.addEventListener('click', () => {
        editBack('hidden')
      })
      editSubmit.addEventListener('click', (e)=>{
        // e.preventDefault()
        console.log(listP,index)
        listP.innerHTML = editInput.value 
        window.localStorage.setItem(index,editInput.value) 
        editBack('hidden')
      })
    }
  })

  function editBack(visibility) {
    editModal.style.visibility = visibility
    backColor.style.visibility = visibility
  }
}


let el = document.getElementById('items');

let sortable = new Sortable(el, {
  animation: 150,
  ghostClass: 'blue-background-class',
  onEnd: function (event){
    console.log(event)
    dragDrop()
  }
})

function dragDrop () {
  let arr = []
  let findListIndex = document.querySelectorAll('ul.list-main > li')
  findListIndex.forEach((e,index)=>{
    let listP = findListIndex[index].querySelector('p')
    arr.push([index,listP.textContent])
  })
  let ls = window.localStorage
  ls.clear() // 로컬스토리지를 비운다.
  localIndex = 0 // localIndex를 초기화 시키고
  for(const i of arr){ 
    ls.setItem(localIndex,i[1]) //arr을 순회하면서 로컬에 저장을 해주고
    localIndex++ // localIndex값을 증가
  }
  findList() // ul.list-main>li 를 모두 찾아주는 함수를 작동시킨다.
}