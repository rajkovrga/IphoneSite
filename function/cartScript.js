document.addEventListener('DOMContentLoaded',function()
{
    
var r = ""
    let articlesBuy = [];

        articlesBuy = [];
        for(var i = 0; i <5;i++)
        {
            
            if(localStorage.getItem(i.toString()) != null)
            {
                articlesBuy.push(localStorage.getItem(i));
        
            }
        }   
    
    
showCartArticles();
function showCartArticles()
{
   
let ajaxRequest = new XMLHttpRequest();
ajaxRequest.open("GET", "/function/products.json");
ajaxRequest.addEventListener('load',function()
{
    var table = document.getElementById('articlesList');

let article = JSON.parse(ajaxRequest.responseText);
let articles = article.products;
var price = 0;


   

      r  = `       <table>
     <tr>
         <td><b>Articles</b></td>
         <td><b>Prices</b></td>
     </tr>`;
     for(let j = 0; j<articlesBuy.length;j++)
     {
     for(let i = 0; i < articles.length;i++)
     {
         if(i == articlesBuy[j])
         {
             price += articles[i].price;
             r += `<tr>
             <td>${articles[i].model}</td>
             <td>${articles[i].price}</td>
             <td class='delete'><i class="fa fa-trash" data-key='${articlesBuy[j]}' aria-hidden="true"></i>
             </td>
         </tr>`;
           
         }
     }
     }
     
     
     r += ` <tr>
     <td id='total'>Total:</td>
     <td>${price}</td>
     </tr>
     <tr>
     <td id="withoutBg"colspan="1"></td>
     <td id="buy">Buy</td>
     </tr>
     </table>`;
     
     table.innerHTML = r; 

     price = 0;
    




$('table tr:odd').css('background','rgb(144, 150, 144)');

})
ajaxRequest.send();
}
console.log(localStorage.length)

});
