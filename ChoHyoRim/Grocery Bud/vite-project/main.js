import "./style.scss";

const alert = document.querySelector(".alert");
const grocery = document.getElementById("grocery");
const submitBtnEl = document.querySelector(".submit_btn");
const container = document.querySelector(".grocery_container");
const list = document.querySelector(".grocery_list");
const clearBtnEl = document.querySelector(".clear_btn");
const lists = JSON.parse(localStorage.getItem("list"));

//load items
window.addEventListener("DOMcontentLoaded", setupItems);
let editElement;
let editFlag = false;
let editId = "";

submitBtnEl.addEventListener("click", addItem);
//clear button
clearBtnEl.addEventListener("click", clearItems);

//drag and drop
$(function () {
  $("#sortable").sortable();
  $("#sortable").disableSelection();
});

//아이템 등록
function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();
  //input창에 입력되고, 수정하는 것이 아닐 때
  if (value && !editFlag) {
    createListItem(id, value);
    //display alert
    displayAlert("item added", "success");
    container.classList.add("show_container");
    const editBtnEls = document.querySelectorAll(".edit_btn");
    const deleteBtnEls = document.querySelectorAll(".delete_btn");
    editBtnEls.forEach((editBtnEl) =>
      editBtnEl.addEventListener("click", editItem)
    );
    deleteBtnEls.forEach((deleteBtnEl) =>
      deleteBtnEl.addEventListener("click", deleteItem)
    );
    //add to local storage
    addToLocalStorage(id, value);
    //set back to default
    setBackToDefault();
    clearBtnEl.classList.add("show_container");
  } else if (value && editFlag) {
    editElement.innerHTML = value;
    displayAlert("value changed!", "success");
    //edit local starage
    editLocalStorage(editId, value);
    setBackToDefault();
  } else {
    displayAlert("입력 후에 등록해주세요!", "danger");
  }
}

//display alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert--${action}`);
  //remove alert
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert--${action}`);
  }, 1000);
}

//모든 아이템 삭제
function clearItems() {
  const items = document.querySelectorAll(".grocery_item");
  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item);
    });
  }
  displayAlert("empty list", "danger");
  setBackToDefault();
  localStorage.removeItem("list");
  clearBtnEl.classList.remove("show_container");
}

//delete function
function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  list.removeChild(element);
  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
  displayAlert("item removed", "danger");
  setBackToDefault();
  //remove from local storage
  removeFromLocalStorage(id);
}

//edit function
function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  console.log("currentTarget", e.currentTarget);
  console.log("currentTarget.parentElement", e.currentTarget.parentElement);
  console.log(
    "currentTarget.parentElement.parentElement",
    e.currentTarget.parentElement.parentElement
  );
  //set edit item
  editElement = e.currentTarget.parentElement.previousElementSibling;
  console.log("editElement", editElement);
  //set form value
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editId = element.dataset.id;
  submitBtnEl.textContent = "edit";
}

//set back to default
function setBackToDefault() {
  grocery.value = "";
  editFlag = false;
  editId = "";
  submitBtnEl.textContent = "submit";
}
//local starage
function addToLocalStorage(id, value) {
  const grocery = { id, value };
  let items = getLocalStorage();
  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));
}
function removeFromLocalStorage(id) {
  let items = getLocalStorage();

  items = items.filter(function (item) {
    if (item.id !== id) {
      return item;
    }
  });
  localStorage.setItem("list", JSON.stringify(items));
}
function editLocalStorage(id, value) {
  let items = getLocalStorage();
  items = items.map(function (item) {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
}
function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}
//setup items
function setupItems() {
  let items = getLocalStorage();
  if (items.length > 0) {
    items.forEach(function (item) {
      createListItem(item.id, item.value);
      container.classList.add("show-container");
    });
  }
}

function createListItem(id, value) {
  const element = document.createElement("div");
  //add class
  element.classList.add("grocery_item");
  //add id
  const attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttributeNode(attr);
  element.innerHTML = /* html */ `

  <p class="item">${value}</p>
  <div class="btn_container">
    <button type="button" class="edit_btn">
    <span class="material-symbols-outlined">edit_document</span>
    </button>
    <button type="button" class="delete_btn">
      <span class="material-symbols-outlined"> delete </span>
    </button>

</div>`;
  //append child
  list.appendChild(element);
}

function render(lists) {
  // list.innerHTML = "";
  // 로컬 스토리지에서 가져온 리스트 데이터들
  lists.forEach((l) => {
    //  list => 쿼리셀렉터로 가져온 html 요소
    list.innerHTML += /* html */ ` 
    <div class="grocery_item" data-id="${l.id}">
      <p class="item">${l.value}</p>
      <div class="btn_container">
        <button type="button" class="edit_btn">
        <span class="material-symbols-outlined">edit_document</span>
        </button>
        <button type="button" class="delete_btn">
          <span class="material-symbols-outlined"> delete </span>
        </button>
      </div>
    </div>`;
  });

  const editBtnEl = document.querySelector(".edit_btn");
  editBtnEl.addEventListener("click", editItem);
}

render(lists);

const editBtns = document.querySelectorAll(".edit_btn");
editBtns.forEach((editBtn) => editBtn.addEventListener("click", editItem));
const deleteBtns = document.querySelectorAll(".delete_btn");
deleteBtns.forEach((deleteBtn) =>
  deleteBtn.addEventListener("click", deleteItem)
);
