document.addEventListener("DOMContentLoaded", function() {
  $(".element.allProducts #sort").hide();

  $(".element.search .fa-sliders-h").click(function() {
    $(".element.allProducts #sort").toggle();
  });
  $(".element.allProducts #sort i").click(function() {
    $(".element.allProducts #sort").hide();
  });
  listFilters();
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

    checkValue += `<h3>Sort</h3><select><option value="choose">${
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
  //search box

  $("#searchText").hide();
  $("#buttonSearch").click(function() {
    $("#searchText").slideToggle("slow");
  });

  let ajaxLoad = new XMLHttpRequest();
  ajaxLoad.open("GET", "/function/products.json");
  ajaxLoad.addEventListener("load", function() {
    let phone = JSON.parse(ajaxLoad.responseText);
    let productNum = phone.products;
    document.getElementById("productsAllSec").innerHTML = "";
    for (let i = 0; i < productNum.length; i++) {
      allProductsShow(i);
    }
    function allProductsShow(i) {
      let allProducts = "";
      allProducts += ` <div class="productSec" data-position='${i}'  data-status='${
        productNum[i].status
      }' data-color='${productNum[i].color}'>
          <div class="photoProductSec"  >
                  <img src="img/${productNum[i].photo}" alt="">
                  <p>${productNum[i].price}€</p>
              </div>
              <div class="photoInfoSec"><p class="modelName">${
                productNum[i].model
              }</p></div> 
      </div>`;

      document.getElementById("productsAllSec").innerHTML += allProducts;
      allProducts = "";
    }

    /** sort */
    sort();
    function sort() {
      document.querySelector("select").addEventListener("change", function() {
        document.getElementsByName("search")[0].value = "";
        for (let i = 0; i < this.children.length; i++) {
          if (this.children[i].selected) {
            document.getElementById("productsAllSec").innerHTML = "";
            switch (this.children[i].value) {
              case "choose":
                for (let r = 0; r < productNum.length; r++) {
                  allProductsShow(r);
                }
                break;
              case "a-z":
                productNum.sort(function(a, b) {
                  if (a.model > b.model) {
                    return 1;
                  } else if (a.model < b.model) {
                    return -1;
                  } else {
                    return 0;
                  }
                });
                for (let i = 0; i < productNum.length; i++) {
                  allProductsShow(i);
                }
                break;
              case "z-a":
                productNum.sort(function(a, b) {
                  if (a.model < b.model) {
                    return 1;
                  } else if (a.model > b.model) {
                    return -1;
                  } else {
                    return 0;
                  }
                });
                for (let i = 0; i < productNum.length; i++) {
                  allProductsShow(i);
                }
                break;
              case "price ascending":
                productNum.sort(function(a, b) {
                  if (a.price < b.price) {
                    return 1;
                  } else if (a.price > b.price) {
                    return -1;
                  } else {
                    return 0;
                  }
                });
                for (let i = 0; i < productNum.length; i++) {
                  allProductsShow(i);
                }
                break;
              case "price descending":
                productNum.sort(function(a, b) {
                  if (a.price > b.price) {
                    return 1;
                  } else if (a.price < b.price) {
                    return -1;
                  } else {
                    return 0;
                  }
                });
                for (let i = 0; i < productNum.length; i++) {
                  allProductsShow(i);
                }
                break;
            }
          }
        }
        detalis();
      });
    }
    checkFilter();
    function checkFilter() {
      $("input[type='checkbox']").change(function() {
        document.getElementsByName("search")[0].value = "";
        var checkColor = document.getElementsByClassName("checkboxColor");
        var checkStatus = document.getElementsByClassName("checkboxStatus");
        var checkedColor = [];
        var filterResult = [];
        var changed = 0;
        var checkedStatus = [];
        document.getElementById("productsAllSec").innerHTML = "";
        for (let i = 0; i < productNum.length; i++) {
          allProductsShow(i);
        }
        for (var i = 0; i < checkColor.length; i++) {
          if (checkColor[i].checked) {
            checkedColor.push(checkColor[i].name);
          }
        }
        for (var i = 0; i < checkStatus.length; i++) {
          if (checkStatus[i].checked) {
            checkedStatus.push(checkStatus[i].name);
          }
        }

        var itemProduct = $(".productSec");
        if (checkedColor.length > 0 && checkedStatus.length > 0) {
          changed = 1;
          for (var j = 0; j < itemProduct.length; j++) {
            for (var i = 0; i < checkedColor.length; i++) {
              for (var k = 0; k < checkedStatus.length; k++) {
                var itemDataColor = itemProduct[j].getAttribute("data-color");
                var itemDataStatus = itemProduct[j].getAttribute("data-status");
                if (
                  itemDataColor == checkedColor[i] &&
                  itemDataStatus == checkedStatus[k]
                ) {
                  filterResult.push(j);
                }
              }
            }
          }
        } else if (checkedColor.length > 0 || checkedStatus.length > 0) {
          changed = 1;
          for (var j = 0; j < itemProduct.length; j++) {
            for (var i = 0; i < 3; i++) {
              var itemDataColor = itemProduct[j].getAttribute("data-color");
              var itemDataStatus = itemProduct[j].getAttribute("data-status");

              if (
                itemDataColor == checkedColor[i] ||
                itemDataStatus == checkedStatus[i]
              ) {
                filterResult.push(j);
              }
            }
          }
        } else {
          for (let i = 0; i < productNum.length; i++) {
            allProductsShow(i);
          }
        }
        if (changed == 1) {
          for (var i = 0; i < itemProduct.length; i++) {
            itemProduct[i].style.display = "none";
          }
          for (var r = 0; r < filterResult.length; r++) {
            itemProduct[filterResult[r]].style.display = "block";
          }
        }
      });
    }

    detalis();
    function detalis() {
      $("#productAllInfo").hide();
      $("#productsAllSec .productSec").click(function() {
        $("#productAllInfo").show();
        let num = $(this).attr("data-position");

        let productDetalis = `
              
        <div class="detalisPhoto"><img src="img/${
          productNum[num].photo
        }" alt=""></div>
          <div class="detalisInfo">
            <h4>Detalis</h4>
            <p><b>Model:</b> ${productNum[num].model}</p>
            <p><b>Resolution:</b> ${productNum[num].resolution}</p>
            <p><b>Ram Memory:</b> ${productNum[num].ram}</p>
            <p><b>Camera:</b> ${productNum[num].camera}</p>
            <p><b>Color:</b> ${productNum[num].color}</p>
            <p id="price"><b>Price:</b> ${productNum[num].price}€</p>
              <span class='addCart'  data-cart='${num}'>Add to Cart <i class="fas fa-shopping-cart"></i></span>  <label>or</label>  <span id="backOnAll">Close</span>
          </div>`;
        $("#productAllInfo").html(productDetalis);
        numberPlus();
        $("html,body").animate(
          {
            scrollTop: 0
          },
          700
        );
        // addCart();
      
        $(".detalisInfo #backOnAll").click(function() {
          $("#productAllInfo").hide();
        });
      });
    }
    // add to cart
    function numberPlus() {
    var  cartAdd = document.querySelectorAll(".addCart");

      $(".addCart").click(function() {
       let number = localStorage.length;
        if (number == 5) {
          alert("5 articles is maximum in cart");
          return;
        }
        let productAdd = document
        .querySelector(".addCart")
        .getAttribute("data-cart");
var keyNum = Number(productAdd)+Number(number);


     
        localStorage.setItem(keyNum, productAdd);
        $("#numberArticles").text(localStorage.length);
      });
    }
    $("#numberArticles").text(localStorage.length);
    // search
    let productName = document.getElementsByClassName("modelName");
    let productsForSearc = document.getElementsByClassName("productSec");
    let productNow = "";
    document
      .getElementsByName("search")[0]
      .addEventListener("input", function() {
        let c = 0;
        document.getElementById("productsAllSec").innerHTML = "";
        listFilters();
        for (let i = 0; i < productNum.length; i++) {
          allProductsShow(i);
        }
        $("#productAllInfo").hide();
        for (let i = 0; i < productsForSearc.length; i++) {
          productNow = productName[i].textContent;
          if (
            productNow.toLowerCase().indexOf(this.value.toLowerCase()) != -1
          ) {
            c = 1;
            if (productsForSearc[i].classList.contains("elementNone")) {
              productsForSearc[i].classList.remove("elementNone");
              productsForSearc[i].classList.add("elementBlock");
            }
          } else if (this.value == "") {
            document.getElementById("productsAllSec").innerHTML = "";

            for (let i = 0; i < productNum.length; i++) {
              allProductsShow(i);
            }
          } else {
            productsForSearc[i].classList.remove("elementBlock");
            productsForSearc[i].classList.add("elementNone");
          }
        }
        if (c == 0) {
          document.getElementById("productsAllSec").innerHTML = "";

          $("#productsAllSec").html(
            ' <div id="noresult"><p>0 result found</p></div>'
          );
        }
        detalis();
        sort();
        checkFilter();

        c = 0;
      });
  });

  $(window).scroll(fadeTop);
  $("#top").click(buttonTop);

  // top button

  function buttonTop() {
    $("html,body").animate({ scrollTop: 0 }, 1000);
  }

  function fadeTop() {
    if ($(this).scrollTop() > 300) {
      $("#top").fadeIn(500);
    } else {
      $("#top").fadeOut(300);
    }
  }

  ajaxLoad.send();
});
