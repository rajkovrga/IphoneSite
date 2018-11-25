document.addEventListener("DOMContentLoaded", function() {
  AOS.init();
  // menu responsive
  let barButton = document.getElementsByClassName("buttonR");
  let itemClick = document.getElementsByClassName("item");
  let items = document.getElementById("items");
  barButton[0].addEventListener("click", menuButton);
  for (var i = 0; i < itemClick.length; i++) {
    let body = document.getElementsByTagName("body");
    itemClick[i].addEventListener("click", function() {
      if (body[0].scrollWidth < 670) {
        if (items.classList.contains("d-flex")) {
          
          items.classList.add("d-none");
          items.classList.remove("d-flex");}
          else {
           items.classList.add("d-flex");
           items.classList.remove("d-none");
         }
        }
    
    });
  }
  // dynamic menu
  let menu = document.querySelector('#items');

  let hrefValue = ['About','Products','Service','Contact','Author'];
  let menuClass = ['item','item2', ""];
  let menuItems = "";
  let classBr = 2;
for(let i = 0; i < hrefValue.length;i++)
{
  if(i != 1 || i != 2)
  {
    classBr = 1;
  }
    menuItems += "<li class="+ menuClass[0] +" "+menuClass[classBr] +"><a href=#"+ hrefValue[i].toLowerCase() +">"+ hrefValue[i] +"</a></li>";
  classBr = 2;

}
menu.innerHTML += menuItems;
  // // top button
  $(window).scroll(fadeTop);
  $("#top").click(buttonTop);

  //smooth scroll plugin

  $("a").smoothScroll({
    speed: 2000
  });

  // contact REGEX

  let pattEmail = /^[A-Za-z]([a-z.A-Z-\d]{1,})@([a-z]+[.]){1,}([a-z]{2,3}){1}$/;
  let pattTitle = /^[\w\s]{5,25}$/;
  let pattDesc = /^[\w\s]{20,550}$/;
  function addError(variable) {
    variable.setAttribute("class", "errorBorder");
  }
  function rmError(variable) {
    if (variable.hasAttribute("class")) {
      variable.removeAttribute("class");
    }
  }
  document.getElementById("send").addEventListener("click", function() {
    let errors = [];
    let mailBox = document.querySelector("#email");
    if (!pattEmail.test(mailBox.value)) {
      errors.push("* Mail is not in correct format");
      addError(mailBox);
    } else if (mailBox.value == "") {
      errors.push("* Enter email");
      addError(mailBox);
    } else {
      rmError(mailBox);
    }
    let titleBox = document.querySelector("#titleContact");
    if (!pattTitle.test(titleBox.value)) {
      errors.push("* Title is not correct");
      addError(titleBox);
    } else if (titleBox.value == "") {
      errors.push("* Enter title");
      addError(titleBox);
    } else {
      rmError(titleBox);
    }

    let descContact = document.querySelector("#descContact");

    if (descContact.value == "") {
      errors.push("* Enter description");
      addError(descContact);
    } else if (!pattDesc.test(descContact.value)) {
      errors.push("* Description is not correct");
      addError(mailBox);
    } else {
      rmError(descContact);
    }
    if (errors.length != 0) {
      let errorVal = "<ul id='errorList'>";
      for (let i = 0; i < errors.length; i++) {
        errorVal += "<li><p>" + errors[i] + "</p></li>";
      }
      errorVal += "</ul>";
      document.querySelector("#error").innerHTML = errorVal;
    } else {
      document.querySelector("#error").innerHTML = "";
    }
  });
  // SLIDER
  let product = document.getElementsByClassName("product1");
  $.getJSON("function/products.json", function(json) {
    let articles = "";
    for (var i = 0; i < 8; i++) {
      putIn();
    }

    function putIn() {
      if (i >= 4) {
        articles +=
          '<div class="product1 productmore"><img src="img/' +
          json.products[i].photo +
          "\"alt='" +
          json.products[i].model +
          "'>   <div class='productDet'><p>" +
          json.products[i].model +
          "</p></div></div> ";
      } else {
        articles +=
          '<div class="product product1"><img src="img/' +
          json.products[i].photo +
          "\"alt='" +
          json.products[i].model +
          "'> <div class='productDet'<p>" +
          json.products[i].model +
          "</p></div></div> ";
      }
    }

    let r = document.querySelector(".articles");
    r.innerHTML += articles;

    // slider ////////
    let photo = document.getElementById("photo");
    let slider = document.getElementById("slider");
    let detalis = document.querySelector(".detalis");
    let detalisElement = "";
    for (let i = 0; i < product.length; i++) {
      product[i].addEventListener("click", function() {
        if(slider.classList.contains('none-slider'))
        {
          slider.classList.remove('none-slider');
          slider.classList.add('flex-slider');
        }
        else
        {
          slider.classList.add('flex-slider');
        }
       

        slide(i - 1, "next");
      });
    }

    // -slider
    function slide(current, direction = "prev") {
      switch (direction) {
        case "prev":
          if (--current < 0) {
            current = product.length - 1;
          }
          break;
        case "next":
          if (++current > product.length - 1) {
            current = 0;
          }
          break;
      }

      photo.src = product[current].children[0].getAttribute("src");
      detalisElement =
        "<p> Model:" +
        json.products[current].model +
        "</p><p> Color:" +
        json.products[current].color +
        "</p><p> Price:" +
        json.products[current].price +
        "</p>";

      detalis.innerHTML = detalisElement;
      photo.setAttribute("data-current", current);
    }

    // Prev

    let btnL = document.getElementsByClassName("fa-caret-left");
    btnL[0].addEventListener("click", function() {
      let current = parseInt(photo.getAttribute("data-current"));
      slide(current);
    });

    // Next

    let btnR = document.getElementsByClassName("fa-caret-right");
    btnR[0].addEventListener("click", function() {
      let current = parseInt(photo.getAttribute("data-current"));

      slide(current, "next");
    });
  });

$('.button-more').click(function()
{
  $('.productmore').slideToggle(1000);
});
  // FUNCTIONS
  // menu button

  function menuButton() {
    let items = document.querySelector(this.getAttribute("data-bar"));
    if (items.classList.contains("d-none")) {
      items.classList.add("d-flex");
      items.classList.remove("d-none");
    } else {
      items.classList.add("d-none");
      items.classList.remove("d-flex");
    }
  }

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
  // close slider
  let cls = document.getElementsByClassName("close");
  for (let i = 0; i < cls.length; i++) {
    cls[i].addEventListener("click", function() {
      if (slider.classList.contains('flex-slider')) {
        slider.classList.add('none-slider');
      }
    });
  }

  // TYPED

  let typed = new Typed("#welcome", {
    strings: ["Welcome :)"],
    cursorChar: "",
    typeSpeed: 300
  });
});
