const spendingInput = document.querySelector("#spending");

const priceInput = document.querySelector("#price");

const formButton = document.querySelector(".add-button");

const list = document.querySelector(".list");

const totalInfo = document.querySelector("#total-info");

const nameInput = document.querySelector("#name-input");

const statusCheck = document.querySelector("#checkBox");

const filterSelect = document.querySelector("#filter-select");

const userName = localStorage.getItem("Name");

nameInput.value = userName;

nameInput.addEventListener("change", (e) => {
  localStorage.setItem("Name", e.target.value);
});

formButton.addEventListener("click", addExpense);

list.addEventListener("click", handleClick);

filterSelect.addEventListener("change", handleFilter);

let total = 0;

function updateTotal(priceInfo) {
  total += Number(priceInfo);
  totalInfo.innerText = total;
}

function addExpense(e) {
  e.preventDefault();

  if (!spendingInput.value || !priceInput.value) {
    alert("Fill in all empty inputs!");
  } else {
    const spendingDiv = document.createElement("div");

    spendingDiv.classList.add("expense");

    if (statusCheck.checked) {
      spendingDiv.classList.add("paid");
    }

    spendingDiv.innerHTML = `
  <h2>${spendingInput.value}</h2>
    <h2 id="value">${priceInput.value}</h2>
        <div class="buttons">
            <img src="./images/pay.png">
            <img id="removeButton" src="./images/remove.png">
        </div>
  `;
    list.appendChild(spendingDiv);

    updateTotal(priceInput.value);
  }

  spendingInput.value = "";
  priceInput.value = "";
}

function handleClick(e) {
  let clickedElement = e.target;
  if (clickedElement.id === "removeButton") {
    const inclusiveElement = clickedElement.parentElement.parentElement;

    const deletedPrice = inclusiveElement.querySelector("#value").innerText;

    updateTotal(-Number(deletedPrice));
    inclusiveElement.remove();
  }
}

function handleFilter(e) {
  const items = list.childNodes;

  const filterValue = e.target.value;

  items.forEach((item) => {
    switch (filterValue) {
      case "all":
        item.style.display = "flex";
        break;

      case "paid":
        if (!item.classList.contains("paid")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        break;
    
      case "not-paid":
        if (item.classList.contains("paid")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        break;
    }
  });
}
