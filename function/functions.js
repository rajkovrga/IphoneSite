function listFilters() {
  var filters = document.getElementsByClassName("filter");
  for (var i = 0; i < filters.length; i++) {
    filters[i].innerHTML = "";
  }
  let checkValue = "";
  let sortOption = [
    "Choose..",
    "A-Z",
    "Z-A",
    "price ascending",
    "price descending"
  ];

  checkValue += `<h3>Sort</h3><select id='sortBox'><option value="0">${
    sortOption[0]
    }</option>`;

  for (let i = 1; i < sortOption.length; i++) {
    checkValue += `<option name='${sortOption[
      i
    ].toLowerCase()}' value="${sortOption[i].toLowerCase()}">${
      sortOption[i]
      }</option>`;
  }
  checkValue += `</select>`;
  document.querySelector(".filter.sort").innerHTML += checkValue;

  let colours = ["White", "Pink", "Black"];
  checkValue = "<h3>Color</h3>";
  for (let i = 0; i < colours.length; i++) {
    checkValue += `<input type="checkbox" name="${colours[
      i
    ].toLowerCase()}" class="checkboxColor" id="${colours[
      i
    ].toLowerCase()}"><span>${colours[i]}</span><br />`;
  }
  document.querySelector(".filter.colours").innerHTML += checkValue;
  checkValue = "<h3>Status</h3>";
  let status = ["S", "Plus", "Classic"];
  for (let i = 0; i < status.length; i++) {
    checkValue += `<input type="checkbox" name="${status[
      i
    ].toLowerCase()}" class="checkboxStatus" id="${status[
      i
    ].toLowerCase()}"><span>${status[i]}</span><br />`;
  }
  document.querySelector(".filter.status").innerHTML += checkValue;
}

function showProducts(products) {
  let ret = ``;
  products.forEach(element => {
    ret += `<div class="productSec" data-id="${element.id}" data-status="classic" data-color="white">
      <div class="photoProductSec">
              <img src="img/${element.photo.src}" alt="${element.photo.alt}">
              <p>${element.price}€</p>
          </div>
          <div class="photoInfoSec"><p class="modelName">${element.model}</p></div> 
  </div>`
  });
  document.getElementById("productsAllSec").innerHTML = ret;
}

function search() {
  document.getElementById("searchText").addEventListener("keyup", function () {
    all()
  })
}
function checkingColor(checkClass) {
  for (let i = 0; i < checkClass.length; i++) {
    checkClass[i].addEventListener("change", function () {
      all()
    })
  }
}
function checkingStatus(checkClass) {
  for (let i = 0; i < checkClass.length; i++) {
    checkClass[i].addEventListener("change", function () {
      all();
    })
  }
}
function sort() {
  document.getElementById("sortBox").addEventListener("change", function () {
    all()
  });
}

function all() {
  let products = JSON.parse(localStorage.getItem("allProducts"));
  let sorting;
  if (document.getElementById("sortBox").value != 0) {
    switch (document.getElementById("sortBox").value) {
      case "a-z":
        sorting = products.sort(function (a, b) {
          if (a.model > b.model) {
            return 1;
          } else if (a.model < b.model) {
            return -1;
          }
          return 0;
        });
        break;
      case "z-a":
        sorting = products.sort(function (a, b) {
          if (a.model < b.model) {
            return 1;
          } else if (a.model > b.model) {
            return -1;
          }
          return 0;
        });
        break;
      case "price ascending":
        sorting = products.sort((a, b) => b.price - a.price);
        break;
      case "price descending":
        sorting = products.sort((a, b) => a.price - b.price);
        break;
    }
    if (sorting != 0) {
      localStorage.setItem("all", JSON.stringify(sorting));
    }
  }

  let searchBox = document.getElementById("searchText");
  if (searchBox.value.length != 0) {
    localStorage.setItem("all", JSON.stringify(products.filter(p => p.model.toLowerCase().includes(searchBox.value))));
  }

  let filterArrStatus = [];
  let checkedStatus = 0;
  let statuses = document.getElementsByClassName("checkboxStatus");
  for (let i = 0; i < statuses.length; i++) {
    if (statuses[i].checked) {
      filterArrStatus.push(statuses[i].name);
      checkedStatus = 1;
    }
  }
  if (checkedStatus != 0) {
    let statusResult = products.filter(c => filterArrStatus.includes(c.status));
    localStorage.setItem("all", JSON.stringify(statusResult));
  }
  products = JSON.parse(localStorage.getItem("all"));
  let filterArrColor = [];
  let checkedColor = 0;
  let colors = document.getElementsByClassName("checkboxColor");
  for (let i = 0; i < colors.length; i++) {
    if (colors[i].checked) {
      filterArrColor.push(colors[i].name);
      checkedColor = 1;
    }
  }
  if (checkedColor != 0) {
    let colorResult = products.filter((cc) => filterArrColor.includes(cc.color));
    localStorage.setItem("all", JSON.stringify(colorResult));
  }
  showProducts(JSON.parse(localStorage.getItem("all")));
  if (JSON.parse(localStorage.getItem("all")).length == 0) {
    document.getElementById("productsAllSec").innerHTML = ` <div id="noresult">
    <p>No result</p>
  </div>`;
  }
  localStorage.setItem("all", JSON.stringify(JSON.parse(localStorage.getItem("allProducts"))));
  showDetalis()
}

function showDetalis() {
  $("#productAllInfo").hide();
  $("#productsAllSec .productSec").click(function () {
    let products = JSON.parse(localStorage.getItem("allProducts"));
    $("#productAllInfo").show();
    let num = $(this).attr("data-id");

    let product = products.filter(p => p.id == num)[0];
    let productDetalis = `
        <div class="detalisPhoto"><img src="img/${
      product.photo.src
      }" alt="${product.photo.alt}"></div>
          <div class="detalisInfo">
            <h4>Detalis</h4>
            <p><b>Model:</b> ${product.model}</p>
            <p><b>Resolution:</b> ${product.resolution}</p>
            <p><b>Ram Memory:</b> ${product.ram}</p>
            <p><b>Camera:</b> ${product.camera}</p>
            <p><b>Color:</b> ${product.color}</p>
            <p id="price"><b>Price:</b> ${product.price}€</p>
              <span class='addCart'  data-cart='${num}'>Add to Cart <i class="fas fa-shopping-cart"></i></span>  <label>or</label>  <span id="backOnAll">Close</span>
          </div>`;
    $("#productAllInfo").html(productDetalis);
    $("html,body").animate(
      {
        scrollTop: 0
      },
      700
    );
    // addCart();

    $(".detalisInfo #backOnAll").click(function () {
      $("#productAllInfo").hide();
    });
    addToCart()
    countElements(JSON.parse(localStorage.getItem("cart")))

  })
}
function countElements(arr) {
  let num = 0;
  let cartNow = arr
  if (cartNow != null) {
    cartNow.forEach(element => {
      num += element.quantity;
    });
    $("#numberArticles").text(num.toString());
    return num;
  }
  $("#numberArticles").text("0");
  return 0;
}
function addToCart() {
  document.getElementsByClassName("addCart")[0].addEventListener("click", function () {

    countElements(JSON.parse(localStorage.getItem("cart")))
    let id = this.getAttribute("data-cart")

    if (countElements(JSON.parse(localStorage.getItem("cart"))) < 5) {

      if (JSON.parse(localStorage.getItem("cart")) == null || JSON.parse(localStorage.getItem("cart")).length == 0) {
        let cart = [];
        cart.push({ id: parseInt(id), quantity: 1 })
        localStorage.setItem("cart", JSON.stringify(cart));
        countElements(JSON.parse(localStorage.getItem("cart")))
      }
      else {
        let r = 0;
        let cartNow = JSON.parse(localStorage.getItem("cart"))
        cartNow.forEach(element => {
          if (element.id == id) {
            element.quantity += 1
            localStorage.setItem("cart", JSON.stringify(cartNow));
            countElements(JSON.parse(localStorage.getItem("cart")))
            r = 1;
            return;
          }
        });
        if (r == 0) {
          cartNow.push({ "id": parseInt(id), quantity: 1 })
          localStorage.setItem("cart", JSON.stringify(cartNow));
          countElements(JSON.parse(localStorage.getItem("cart")))
          return;
        }
      }
    }
    else {
      alert("Ne moze vise od 5");
    }

  })
}
