const form = document.querySelector('.grocery-form')
const input = document.querySelector('#grocery')
const alert = document.querySelector('.alert')
const list = document.querySelector('.grocery-list')
const container = document.querySelector('.grocery-container')
const clearBtn = document.querySelector('.clear-btn')
const submitBtn = document.querySelector('.submit-btn')

let editFlag = false
let editElement
let editID = ''


// submit 
form.addEventListener('submit', function(e) {
  e.preventDefault()
  const value = input.value
  const id = new Date().getTime().toString()
  if(value && !editFlag) {
    const el = document.createElement('article')
    el.classList.add('grocery-item')
    el.setAttribute('data-id', id)
    el.innerHTML = /* html */`
    <p class="title">${value}</p>
    <div class="btn-container">
      <button type="button" class="edit-btn">
        <i class="fas fa-edit"></i>
      </button>
      <button type="button" class="delete-btn">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `
  list.appendChild(el)
  container.classList.add('show-container')
  setBackToDefault()
  // localstorage
  const storage = {id: id, value: value}
  let items = localStorage.getItem('list')? JSON.parse(localStorage.getItem('list')) : []
  items.push(storage)
  localStorage.setItem('list', JSON.stringify(items))
  } else if(value && editFlag) {

  } else {
    alert.textContent = 'please enter value'
    alert.classList.add('alert-danger')

    setTimeout(function() {
      alert.textContent = ''
      alert.classList.remove('alert-danger')
    }, 1000)
  }
})

// clear items 클릭
clearBtn.addEventListener('click', function() {
  const items = document.querySelectorAll('.grocery-item')

  if(items.length > 0) {
    for(const x of items) {
      list.removeChild(x)
    }
  }
  container.classList.remove('show-container')
  setBackToDefault()
  localStorage.removeItem('list')
})

function setBackToDefault () {
  input.value = ''
  editFlag = false
  editID = ''
  submitBtn.text = 'submit'
}