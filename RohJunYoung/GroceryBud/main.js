const inputForm = document.querySelector(".grocery-form");
const submitBtn = document.querySelector(".submit-btn");
const inputData = document.querySelector(".grocery-input");
const groceryLists = document.querySelector(".grocery-lists");
const clearBtn = document.querySelector(".clear-btn");

renderItems();

// 재료 추가 CREATE, 그리고 렌더링도 같이(순서유지)!!
// preventdefault로 submit시 리로드 막기
inputForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const time = new Date().getTime().toString();
  addContext(time, inputData.value);
  window.localStorage.setItem(time, inputData.value);
  inputData.value = null;
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
  console.log("ZZ");
  window.localStorage.clear();
  renderItems();
  clearBtn.classList.remove("show");
  clearBtn.classList.add("hidden");
}

//edit grocery
function editGrocery() {
  submitBtn.textContent = "Edit";
  submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    // 와 미쳤다 이게 화살표함수 this???????????
    // 아 이제보니 상위함수에서 parameter로 넘겨도 됐겠지만... this 사용이 뿌듯하네요
    const parentItem = document.getElementById(
      this.id.slice(4, this.id.length)
    );
    window.localStorage.setItem(parentItem.id, inputData.value);
    parentItem.childNodes[1].textContent = inputData.value;
    submitBtn.textContent = "Submit";
  });
}

//delete grocery
function deleteEachGrocery() {
  console.log(this);
  const parentItem = document.getElementById(this.id.slice(6, this.id.length));
  console.log(parentItem);
  window.localStorage.removeItem(parentItem.id);
  parentItem.innerHTML = "";
  parentItem.style.margin = 0;
  parentItem.style.padding = 0;
  if (window.localStorage.length !== 0) {
    clearBtn.classList.add("hidden");
    clearBtn.classList.add("show");
  } else {
    clearBtn.classList.remove("show");
    clearBtn.classList.add("hidden");
  }
}
