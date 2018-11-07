document.addEventListener("DOMContentLoaded", function() {
  AOS.init();

  // menu

  let barButton = document.getElementsByClassName("buttonR");
  barButton[0].addEventListener("click", menuButton);



  // scroll /////////

  $(".item > a").click(elementScroll);
  $(window).scroll(fadeTop);
  $("#top").click(buttonTop);
  $("#dole > a").click(downScroll);

  // FUNCTION

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
  
  // end slider

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
  // JSON - JOS

  $.getJSON("function/proizvodi.json", function(json) {
    let artikli = "";
    var n = 4;
    function opet(n) {
      for (var i = 0; i < n; i++) {
        position(i);
      }

    }
    function position(i) {
      if (i >= 4) {
        artikli +=
          '<div class="proizvod proizvodJos"><img src="img/' +
          json.proizvodi[i].slika +
          "\"alt='" +
          json.proizvodi[i].model +
          "'>   <div class='naziv'><p>"+ json.proizvodi[i].model +"</p></div></div> ";
      } else {
        artikli +=
          '<div class="proizvod"><img src="img/' +
          json.proizvodi[i].slika +
          "\"alt='" +
          json.proizvodi[i].model +
          "'> <div class='naziv'<p>"+ json.proizvodi[i].model +"</p></div></div> ";
      }
    }
   

    $(".dugme-jos").click(function() {
      artikli = "";
      if (n == 4) {
        n = 8;
        opet(n);
        $("#p-jos").text("MANJE");
        $(this).addClass("anm-jos");
      } else if (n == 8) {
        n = 4;
        opet(n);
        $(this).removeClass("anm-jos");
        $("#p-jos").text("JOS");
      }
      r.innerHTML = artikli;
    
    });
    opet(n);

    var r = document.querySelector(".artikli");
    r.innerHTML = artikli;
  // slider ////////

  let proizvod = document.getElementsByClassName("proizvod");
  console.log(proizvod.length);
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

  // TYPED

  var typed = new Typed("#welcome", {
    strings: ["dobro dosli"],
    cursorChar: "",
    typeSpeed: 300
  });
});
