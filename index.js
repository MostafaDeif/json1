// Fatora System (upgraded)
let iName = document.querySelector("#iName");
let iPrice = document.querySelector("#iPrice");
let iQty = document.querySelector("#iQty");
let tbody = document.querySelector("table tbody");
let totalCell = document.querySelector("#totalValue");

// Initialize fatoraArr from local storage or as an empty array
let fatoraArr = JSON.parse(localStorage.getItem("fatoraArr")) || [];

function renderFatora() {
  tbody.innerHTML = "";
  fatoraArr.forEach((el, index) => {
    tbody.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${el.name}</td>
            <td>${el.price}</td>
            <td>${el.qty}</td>
            <td>${el.price * el.qty}</td>
            <td><button class="btn btn-danger" onclick="deleteRow(${index})">del</button></td>
        </tr>
    `;
  });
  totalCell.innerHTML = getTotal();
  saveToLocalStorage(); // Save to local storage whenever the list is rendered
}


function addToFatora() {
  let itemObj = {
    name: iName.value,
    price: +iPrice.value,
    qty: +iQty.value,
  };
  fatoraArr.push(itemObj);
  renderFatora();
  iPrice.value = "";
  iName.value = "";
  iQty.value = "";
}

function getTotal() {
  let final = 0;
  fatoraArr.forEach((el) => {
    let subTotal = el.price * el.qty;
    final += subTotal;
  });
  return final;
}

function deleteRow(a) {
  fatoraArr.splice(a, 1);
  renderFatora();
}

function saveToLocalStorage() {
  localStorage.setItem("fatoraArr", JSON.stringify(fatoraArr));
}

renderFatora();
