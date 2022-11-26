import "./style.scss";

const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery_form");
const grocery = document.getElementById("grocery");
const itemEl = document.querySelector(".item");
const submitBtnEl = document.querySelector(".submit_btn");
const container = document.querySelector(".grocery_container");
const list = document.querySelector(".grocery_list");
const clearBtnEl = document.querySelector(".clear_btn");

console.log(localStorage.getItem("list"));

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
    // container.classList.add("show-container");
    const editBtnEl = document.querySelector(".edit_btn");
    const deleteBtnEl = document.querySelector(".delete_btn");
    deleteBtnEl.addEventListener("click", deleteItem);
    editBtnEl.addEventListener("click", editItem);
    //add to local storage
    addToLocalStorage(id, value);
    //set back to default
    setBackToDefault();
    clearBtnEl.classList.add("show-container");
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

//clear items
function clearItems() {
  const items = document.querySelectorAll(".grocery_item");
  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item);
    });
  }
  container.classList.remove("show-container");
  displayAlert("empty list", "danger");
  setBackToDefault();
  localStorage.removeItem("list");
}

//delete function
function deleteItem(e) {
  console.log("item deleted");
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
  console.log("edit item");
  const element = e.currentTarget.parentElement.parentElement;
  //set edit item
  editElement = e.currentTarget.parentElement.previousElementSibling;
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
  <div class="grocery_item">
  <p class="item">${value}</p>
  <div class="btn_container">
    <button type="button" class="edit_btn">
    <span class="material-symbols-outlined">
edit_document
</span>
    </button>
    <button type="button" class="delete_btn">
      <span class="material-symbols-outlined"> delete </span>
    </button>
  </div>
</div>`;
  //append child
  list.appendChild(element);
}

function render(lists) {
  if (lists === null) return;
  lists.forEach((l) => {
    container.innerHTML += /* html */ `
  <div class="grocery_item">
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
}

render(lists);