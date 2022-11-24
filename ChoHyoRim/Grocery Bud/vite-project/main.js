import "./style.scss";

const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery_form");
const grocery = document.getElementById("grocery");
const itemEl = document.querySelector(".item");
const submitBtnEl = document.querySelector(".submit_btn");
const container = document.querySelector(".grocery_container");
const list = document.querySelector(".grocery_list");
const editBtnEl = document.querySelector(".edit_btn");
const deleteBtnEl = document.querySelector(".delete_btn");
const clearBtnEl = document.querySelector(".clear");

let editElement;
let editFlag = false;
let editId = "";

submitBtnEl.addEventListener("click", addItem);

function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();
  if (value && !editFlag) {
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
        <span class="material-symbols-outlined"> edit_square </span>
      </button>
      <button type="button" class="delete_btn">
        <span class="material-symbols-outlined"> delete </span>
      </button>
    </div>
  </div>`;
    //append child
    list.appendChild(element);
    //display alert
    displayAlert("item added to the list", "success");
  } else if (value && editFlag) {
    console.log("editing");
  } else {
    displayAlert("입력 후에 등록해주세요!", "danger");
  }
}

//display alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  //remove alert
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}
