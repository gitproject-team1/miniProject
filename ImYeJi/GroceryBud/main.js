// 초기화 코드
const alertEl = document.querySelector('.alert')
const formEl = document.querySelector('.grocery-form')
const inputEl = document.querySelector('#grocery')
const submitBtnEl = document.querySelector('.submit-btn')
const containerEl = document.querySelector('.grocery-container')
const listEl = document.querySelector('.grocery-list')
const deleteBtnEl = document.querySelector('.delete-btn')
const clearBtnEl = document.querySelector('.clear-btn')

// list 추가
submitBtnEl.addEventListener('click', () => {
  alert()
})

inputEl.addEventListener('keydown', function(e) {
  if(e.keyCode === 13) {
    e.preventDefault()
    alert()
  }
})





// Functions
function makeGroceryList (items) {
  const el = document.createElement('div') 
  el.classList.add('grocery-list')
  el.innerHTML = /* html */ `
  <article class="grocery-item">
    <p class="title">${items}</p>
      <div class="btn-container">
        <button type="button" class="edit-btn">
          <i class="fas fa-edit"></i>
        </button>
        <button type="button" class="delete-btn">
          <i class="fas fa-trash"></i>
        </button>
      </div>
  </article>
`
  containerEl.append(el)
}

function alert () {
  items = inputEl.value

  if(items === '') {
    alertEl.textContent = 'Empty Value'
    alertEl.style.backgroundColor = 'tomato'
    setTimeout(()=> {
      alertEl.textContent = ''
      alertEl.style.backgroundColor = ''
    }, 2000)
  } 
  
  else {
    makeGroceryList(items)
    inputEl.value = ''
  }
}