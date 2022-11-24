const inputForm = document.querySelector(".grocery-form");
const inputData = document.querySelector(".grocery-input");
const groceryLists = document.querySelector(".grocery-lists");

// 재료 추가 CREATE, 그리고 렌더링도 같이(순서유지)!!
// preventdefault로 submit시 리로드 막기

// window.localStorage.clear();
inputForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const time = new Date().getTime().toString();
  window.localStorage.setItem(time, inputData.value);
  const grocerySection = document.createElement("div");
  grocerySection.id = time;
  grocerySection.classList.add("groceries");
  grocerySection.innerHTML = /* html */ `
		<p class="title">${inputData.value}</p>
    <div class="btn-container">
      <button type="button" class="edit-btn">
				<i class="fa-solid fa-pen-to-square"></i>
      </button>
      <button type="button" class="delete-btn">
			<i class="fa-solid fa-trash"></i>
      </button>
    </div>
	`;
  groceryLists.append(grocerySection);
  inputData.value = null;
});
