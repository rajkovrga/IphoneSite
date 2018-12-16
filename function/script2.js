document.addEventListener("DOMContentLoaded", function() {
  $(".element.allProducts #sort").hide();

  $(".element.search i").click(function() {
    $(".element.allProducts #sort").toggle();
  });
  $(".element.allProducts #sort i").click(function() {
    $(".element.allProducts #sort").hide();
  });

  let ajaxLoad = new XMLHttpRequest();

  ajaxLoad.open("GET", "/function/products.json");
  ajaxLoad.addEventListener("load", function() {
    let phone = JSON.parse(ajaxLoad.responseText);
    var allProducts = "";
    for (let i = 0; i < phone.products.length; i++) {
      allProducts += ` <div class="productSec">
        <div class="photoProductSec" data-position=${i}>
                <img src="img/${phone.products[i].photo}" alt="">
                <p>${phone.products[i].price}</p>
            </div>
            <div class="photoInfoSec"><p>${
              phone.products[i].model
            }</p><div class="addCart"> <i class="fas fa-shopping-cart"></i></div></div> 
    </div>`;
    }

    document.getElementById("productsAllSec").innerHTML += allProducts;
    allProducts = "";
    
    /** search */
    let checkboxes = document.getElementsByClassName("checkboxC");
    let color = [];
    allProducts = "";
    $(".checkboxC").change(function() {
      color = [];
      document.getElementById("productsAllSec").innerHTML = "";
      for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
          color.push(checkboxes[i].name);
        }
      }
      for (var j = 0; j < color.length; j++) {
        for (var i = 0; i < phone.products.length; i++) {
          if (phone.products[i].color == color[j]) {
            allProducts += ` <div class="productSec">
              <div class="photoProductSec" data-position=${i}>
                      <img src="img/${phone.products[i].photo}" alt="">
                      <p>${phone.products[i].price}</p>
                  </div>
                  <div class="photoInfoSec"><p>${
                    phone.products[i].model
                  }</p><div class="addCart"> <i class="fas fa-shopping-cart"></i></div></div> 
          </div>`;
          }
        }
      }
      document.getElementById("productsAllSec").innerHTML += allProducts;
      allProducts = "";
      $("#productAllInfo").hide();
      detalis();
    });
    detalis();  


    function detalis()
    {
      $("#productAllInfo").hide();
      $("#productsAllSec .productSec .photoProductSec").click(function() {
        $("#productAllInfo").show();
        let num = $(this).attr("data-position");
  
        let productDetalis = `
              
        <div class="detalisPhoto"><img src="img/${
          phone.products[num].photo
        }" alt=""></div>
          <div class="detalisInfo">
            <h4>Detalis</h4>
            <p><b>Model:</b> ${phone.products[num].model}</p>
            <p><b>Resolution:</b> ${phone.products[num].resolution}</p>
            <p><b>Ram Memory:</b> ${phone.products[num].ram}</p>
            <p><b>Camera:</b> ${phone.products[num].camera}</p>
            <p><b>Color:</b> ${phone.products[num].color}</p>
            <p id="price"><b>Price:</b> ${phone.products[num].price}</p>
              <span>Add to Cart <i class="fas fa-shopping-cart"></i></span>  <label>or</label>  <span id="backOnAll">Close</span>
          </div>`;
        $("#productAllInfo").html(productDetalis);
        $("html,body").animate(
          {
            scrollTop: 0
          },
          700
        );
        $(".detalisInfo #backOnAll").click(function() {
          $("#productAllInfo").hide();
        });
      });
    }
    
  });

  ajaxLoad.send();
});
