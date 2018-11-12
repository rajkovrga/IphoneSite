document.addEventListener("DOMContentLoaded", function() {
  AOS.init();

  // menu
  // menu button
  let barButton = document.getElementsByClassName("buttonR");
  let itemClick = document.getElementsByClassName("item");
  let items = document.getElementById("items");
  barButton[0].addEventListener("click", menuButton);
  for (var i = 0; i < itemClick.length; i++) {
    var body = document.getElementsByTagName("body");
    itemClick[i].addEventListener("click", function() {
      if (body[0].scrollWidth < 670) {
        if (items.classList.contains("d-none")) {
          items.classList.add("d-flex");
          items.classList.remove("d-none");
        } else {
          items.classList.add("d-none");
          items.classList.remove("d-flex");
        }
      }
    });
  }
  // scroll /////////

  // menu element scroll
  $(".item > a").click(elementScroll);
  // top button
  $(window).scroll(fadeTop);
  $("#top").click(buttonTop);
  // down scroll
  $("#dole > a").click(downScroll);

  // KONTAKT REGEX

  var pattEmail = new RegExp(
    /^[^,.<>/?;:'"-_=+\|*+!@#$%^&\(\)\[\]\{\}`~]([\w\d.-]+|[\w.-]+)@\w+.{1,}(\w{2,3}){1}$/
  );

  let mail = document.getElementById("email");
  let mailErr = document.querySelector("#mailErr");
  mail.addEventListener("blur", function() {
    let str = document.getElementById("email").value;
    let regexTestMail = pattEmail.test(str);
    if (str.length == 0) {
      mail.style.borderColor = "rgb(122, 0, 0)";
      mailErr.textContent = "* Nije uneta Email adresa";
    } else if (regexTestMail == false) {
      mail.style.borderColor = "rgb(122, 0, 0)";
      mailErr.textContent = "* Nije dobro uneta Email adresa";
    } else {
      mail.style.borderColor = "rgb(95, 94, 94)";
      mailErr.innerHTML = "";
    }
  });
  var pattNaslov = new RegExp(/^[\w\s]{5,25}$/);
  let naslovKontakt = document.querySelector("#naslovKontakt");
  let naslovErr = document.querySelector("#naslovErr");

  naslovKontakt.addEventListener("blur", function() {
    let str2 = document.getElementById("naslovKontakt").value;
    let regexTestNaslov = pattNaslov.test(str2);
    if (str2.length == 0) {
      naslovKontakt.style.borderColor = "rgb(122, 0, 0)";
      naslovErr.textContent = "* Nije unet naslov";
    } else if (str2.length < 5) {
      naslovKontakt.style.borderColor = "rgb(122, 0, 0)";
      naslovErr.textContent = "* Unet naslov je prekratak";
    } else if (regexTestNaslov == false) {
      naslovKontakt.style.borderColor = "rgb(122, 0, 0)";
      naslovErr.textContent = "* Nije dobro unet naslov";
    } else {
      naslovKontakt.style.borderColor = "rgb(95, 94, 94)";
      naslovErr.innerHTML = "";
    }
  });
  var pattOpis = new RegExp(/^[\w\s]{20,550}$/);
  let opisKontakt = document.querySelector("#opisKontakt");
  let opisErr = document.querySelector("#opisErr");

  opisKontakt.addEventListener("blur", function() {
    let str3 = document.querySelector("#opisKontakt").value;
    let regexTestOpis = pattOpis.test(str3);
    if (str3.length == 0) {
      opisKontakt.style.borderColor = "rgb(122, 0, 0)";
      opisErr.textContent = "* Nije unet opis";
    } else if (str3.length < 20) {
      opisKontakt.style.borderColor = "rgb(122, 0, 0)";
      opisErr.textContent = "* Unet opis je prekratak";
    } else if (regexTestOpis == false) {
      opisKontakt.style.borderColor = "rgb(122, 0, 0)";
      opisErr.textContent = "* Nije dobro unet opis";
    } else {
      opisKontakt.style.borderColor = "rgb(95, 94, 94)";
      opisErr.innerHTML = "";
    }
  });

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
    let detalji = document.querySelector(".detalji");
    let detaljiElementi = "";
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
      detaljiElementi =
        "<p> Model:" +
        json.proizvodi[current].model +
        "</p><p> Boja:" +
        json.proizvodi[current].boja +
        "</p><p> Cena:" +
        json.proizvodi[current].cena +
        "</p>";
      detalji.innerHTML = detaljiElementi;
      slika.setAttribute("data-current", current);
    }

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
  // close slider
  let cls = document.getElementsByClassName("close");
  for (var i = 0; i < cls.length; i++) {
    cls[i].addEventListener("click", function() {
      if (slider.style.display == "flex") {
        slider.style.display = "none";
        c = 0;
      }
    });
  }

  // TYPED

  var typed = new Typed("#welcome", {
    strings: ["dobro dosli"],
    cursorChar: "",
    typeSpeed: 300
  });
});
