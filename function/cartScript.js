document.addEventListener("DOMContentLoaded", function() {
 
  if(localStorage.length != 0)
  {
    showCartArticles();
      $('.empty').hide();
  }
  var r = "";
  function showCartArticles() {
   
    $("#numberArticles").text(localStorage.length);
    let ajaxRequest = new XMLHttpRequest();
    ajaxRequest.open("GET", "/function/products.json");
    ajaxRequest.addEventListener("load", function() {
      let article = JSON.parse(ajaxRequest.responseText);
      let articles = article.products;
      var price = 0;

      document.getElementById("articlesList").innerHTML.innerHTML = "";

      r = `       <table>
     <tr>
         <td><b>Articles</b></td>
         <td><b>Prices</b></td>
     </tr>`;
      for (let j = 0; j < localStorage.length; j++) {
        for (let i = 0; i < articles.length; i++) {
          if (i == localStorage.key(j)) {
            price += articles[i].price;
            r += `<tr>
             <td>${articles[i].model}</td>
             <td>${articles[i].price}€</td>
             <td class='delete'><i class="fa fa-trash" data-key='${localStorage.key(
               j
             )}' aria-hidden="true"></i>
             </td>
         </tr>`;
          }
        }
      }

      r += ` <tr>
     <td id='total'>Total:</td>
     <td>${price}€</td>
     </tr>
     <tr>
     <td id="withoutBg"></td>
     <td id="buy">Buy</td>
     </tr>
     </table>`;

      document.getElementById("articlesList").innerHTML = r;

      price = 0;

      $("table tr:odd").css("background", "rgb(144, 150, 144)");
      
      $(".fa-trash").click(function() {
        key = $(this).attr("data-key");
        localStorage.removeItem(key);
      
        $("#numberArticles").text(localStorage.length);
        if(localStorage.length != 0)
        {
          showCartArticles();
            $('.empty').hide();
        }
        else
        {
            $('.empty').show();
            document.getElementById('articlesList').innerHTML = "";
        }
      });
      $('#buy').click(function()
      {
          $('#withoutBg').html('<p>The further functionality of this site is under construction!</p>');
      })
    });
 
    ajaxRequest.send();
  }
});
