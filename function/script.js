document.addEventListener("DOMContentLoaded", function() {
  AOS.init();

  // menu
  // menu button
  let barButton = document.getElementsByClassName("buttonR");
  barButton[0].addEventListener("click", menuButton);

  // scroll /////////

  // menu element scroll
  $(".item > a").click(elementScroll);
  // top button
  $(window).scroll(fadeTop);
  $("#top").click(buttonTop);
  // down scroll
  $("#dole > a").click(downScroll);

  // SLIDER
  let proizvod = document.getElementsByClassName("proizvod");
  $.getJSON("function/proizvodi.json", function(json) {
    let artikli = "";
    for (var i = 0; i < json.proizvodi.length; i++) {
      ubaci();
    }
    function ubaci() {
      if (i >= 4) {
        artikli +=
          '<div class="proizvod proizvodJos prosiri-none"><img src="img/' +
          json.proizvodi[i].slika +
          "\"alt='" +
          json.proizvodi[i].model +
          "'>   <div class='naziv'><p>" +
          json.proizvodi[i].model +
          "</p></div></div> ";
      } else {
        artikli +=
          '<div class="proizvod"><img src="img/' +
          json.proizvodi[i].slika +
          "\"alt='" +
          json.proizvodi[i].model +
          "'> <div class='naziv'<p>" +
          json.proizvodi[i].model +
          "</p></div></div> ";
      }
    }

    var r = document.querySelector(".artikli");
    r.innerHTML += artikli;

    // slider ////////
    let slika = document.getElementById("slika");
    let slider = document.getElementById("slider");

    for (let i = 0; i < proizvod.length; i++) {
      proizvod[i].addEventListener("click", function() {
        slider.style.display = "flex";
        slide(i - 1, "next");
      });
    }

    // -slider
    function slide(current, direction = "prev") {
      switch (direction) {
        case "prev":
          if (--current < 0) {
            current = proizvod.length - 1;
          }
          break;
        case "next":
          if (++current > proizvod.length - 1) {
            current = 0;
          }
          break;
      }
      slika.src = proizvod[current].children[0].getAttribute("src");
      slika.setAttribute("data-current", current);
    }

    // close slider
    let cls = document.getElementsByClassName("close");
    cls[0].addEventListener("click", function() {
      if (slider.style.display == "flex") {
        slider.style.display = "none";
        c = 0;
      }
    });

    // Prev

    let btnL = document.getElementsByClassName("fa-caret-left");
    btnL[0].addEventListener("click", function() {
      let current = parseInt(slika.getAttribute("data-current"));
      slide(current);
    });

    // Next

    let btnR = document.getElementsByClassName("fa-caret-right");
    btnR[0].addEventListener("click", function() {
      let current = parseInt(slika.getAttribute("data-current"));
      slide(current, "next");
    });
  });

  var prosiri = document.getElementsByClassName("dugme-jos");
  let br = 0;
  prosiri[0].addEventListener("click", function() {
    br += 1;

    for (var i = 4; i < proizvod.length; i++) {
      if (br % 2 == 1) {
        proizvod[i].classList.remove("prosiri-none");
      } else {
        proizvod[i].classList.add("prosiri-none");
      }
    }
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

  // down scroll

  function downScroll() {
    var hrr = $(this).attr("href");
    var goTopp = $(hrr).offset().top;
    $("html,body").animate({ scrollTop: goTopp }, 2000);
  }

  // menu element scroll

  function elementScroll(e) {
    var p = $(this).attr("href");
    var tops = $(p).offset().top;
    $("body,html")
      .stop()
      .animate({ scrollTop: tops }, 2000);
  }

  // TYPED

  var typed = new Typed("#welcome", {
    strings: ["dobro dosli"],
    cursorChar: "",
    typeSpeed: 300
  });
});
