// Default SortableJS
import Sortable from "sortablejs";
// import Sortable from "./node_modules/sortablejs/modular/sortable.complete.esm.js";
// Cherrypick extra plugins
// import Sortable, { MultiDrag, Swap } from "sortablejs";

// Sortable.mount(new MultiDrag(), new Swap());

// const Sortable = require("sortablejs");

const inputForm = document.querySelector(".grocery-form");
const submitBtn = document.querySelector(".submit-btn");
const inputData = document.querySelector(".grocery-input");
const groceryLists = document.querySelector(".grocery-lists");
const clearBtn = document.querySelector(".clear-btn");
const alertStatus = document.querySelector(".status-alert");

renderItems();

// 재료 추가 CREATE, 그리고 렌더링도 같이(순서유지)!!
// preventdefault로 submit시 리로드 막기
inputForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const time = new Date().getTime().toString();
  addContext(time, inputData.value);
  window.localStorage.setItem(time, inputData.value);
  inputData.value = null;
  alertStatus.classList.add("alert-add");
  alertStatus.textContent = "Item Added To The List";
  setTimeout(() => {
    alertStatus.classList.remove("alert-add");
    alertStatus.textContent = "";
  }, 1000);
});

// 전체삭제버튼 이벤트 리스너
clearBtn.addEventListener("click", deleteGroceryAll);

// 실시간으로 하나씩 추가. 렌더링에서도 이함수사용
function addContext(key, val) {
  clearBtn.classList.add("show");
  const grocerySection = document.createElement("div");
  grocerySection.id = key;
  grocerySection.classList.add("groceries");
  grocerySection.innerHTML = /* html */ `
		<p class="title">${val}</p>
    <div class="btn-container">
      <button type="button" class="edit-btn" id=edit${key}>
				<i class="fa-solid fa-pen-to-square"></i>
      </button>
      <button type="button" class="delete-btn" id=delete${key}>
			<i class="fa-solid fa-trash"></i>
      </button>
    </div>
	`;
  groceryLists.append(grocerySection);
  const editBtn = document.getElementById(`edit${key}`);
  editBtn.addEventListener("click", editGrocery);
  const deleteBtn = document.getElementById(`delete${key}`);
  deleteBtn.addEventListener("click", deleteEachGrocery);
  // alertStatus.classList.add("alert-add");
}

// 결국 렌더링은 이 함수가함. submit 이벤트리스너는 하나씩 실시간으로 넣어주는 역할
function renderItems() {
  // 시간순서 sort
  groceryLists.innerHTML = "";
  const sortedStorage = Object.keys(window.localStorage)
    .sort()
    .reduce((acc, key) => {
      acc[key] = window.localStorage[key];
      return acc;
    }, {});
  for (let key in sortedStorage) {
    addContext(key, sortedStorage[key]);
  }
  if (window.localStorage.length !== 0) {
    clearBtn.classList.add("hidden");
    clearBtn.classList.add("show");
  } else {
    clearBtn.classList.remove("show");
    clearBtn.classList.add("hidden");
  }
}

// Delete all
function deleteGroceryAll() {
  window.localStorage.clear();
  renderItems();
  clearBtn.classList.remove("show");
  clearBtn.classList.add("hidden");
  alertStatus.classList.add("alert-clear");
  alertStatus.textContent = "Empty List";
  setTimeout(() => {
    alertStatus.classList.remove("alert-clear");
    alertStatus.textContent = "";
  }, 1000);
}

//edit grocery
function editGrocery() {
  submitBtn.textContent = "Edit";
  inputData.value = null;
  const parentItem = document.getElementById(this.id.slice(4, this.id.length));
  inputData.value = window.localStorage.getItem(parentItem.id);
  const editFunction = (event) => {
    event.preventDefault();
    window.localStorage.setItem(parentItem.id, inputData.value);
    parentItem.childNodes[1].textContent = inputData.value;
    submitBtn.textContent = "Submit";
    inputData.value = null;
    // 삭제 중요
    submitBtn.removeEventListener("click", editFunction);
    alertStatus.classList.add("alert-edit");
    alertStatus.textContent = "Value Changed";
    setTimeout(() => {
      alertStatus.classList.remove("alert-edit");
      alertStatus.textContent = "";
    }, 1000);
  };
  submitBtn.addEventListener("click", editFunction);
}

//delete grocery
function deleteEachGrocery() {
  const parentItem = document.getElementById(this.id.slice(6, this.id.length));
  window.localStorage.removeItem(parentItem.id);
  parentItem.remove();
  if (window.localStorage.length !== 0) {
    clearBtn.classList.add("hidden");
    clearBtn.classList.add("show");
  } else {
    clearBtn.classList.remove("show");
    clearBtn.classList.add("hidden");
  }
  alertStatus.classList.add("alert-delete");
  alertStatus.textContent = "Item Removed";
  setTimeout(() => {
    alertStatus.classList.remove("alert-delete");
    alertStatus.textContent = "";
  }, 1000);
}

// 자 그러면 rendering순서를 바꿔줄 필요도있음.
let lists = document.querySelector(".grocery-lists");
new Sortable(lists, {
  handle: ".groceries",
  animation: 200,
  // 순서가바뀌면 컨텐트들도 재배치...
  onEnd: function (event) {
    let tmpIds = [];
    for (let node of event.to.childNodes) {
      tmpIds.push(node.id);
    }
    tmpIds.sort((a, b) => a - b);
    event.to.childNodes.forEach((node, i) => {
      node.childNodes[3].childNodes[1].id = `edit${tmpIds[i]}`;
      node.childNodes[3].childNodes[3].id = `delete${tmpIds[i]}`;
      node.id = tmpIds[i];
      window.localStorage.setItem(tmpIds[i], node.childNodes[1].textContent);
    });
  },
});
