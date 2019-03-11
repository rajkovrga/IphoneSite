document.addEventListener("DOMContentLoaded", function () {
    $(".element.allProducts #sort").hide();

    $(".element.search .fa-sliders-h").click(function () {
        $(".element.allProducts #sort").toggle();
    });
    $(".element.allProducts #sort i").click(function () {
        $(".element.allProducts #sort").hide();
    });
    listFilters();

    let xr = new XMLHttpRequest();
    xr.open("GET", "function/products.json");

    xr.addEventListener("load", function () {
        let productsAll = JSON.parse(xr.responseText);
        localStorage.setItem("allProducts", JSON.stringify(productsAll));
        localStorage.setItem("all", JSON.stringify(productsAll));
        showProducts(productsAll);
        search();
        let statusArr = document.getElementsByClassName("checkboxStatus")
        checkingStatus(statusArr)
        let coloursArr = document.getElementsByClassName("checkboxColor");
        checkingColor(coloursArr);
        sort()
        showDetalis();
        countElements(JSON.parse(localStorage.getItem("cart")))

    });

    xr.send();

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

    //search box
    $("#searchText").hide();
    $("#buttonSearch").click(function () {
        $("#searchText").slideToggle("slow");
    });

}); 