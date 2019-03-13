document.addEventListener("DOMContentLoaded", function () {

    let allItems = JSON.parse(localStorage.getItem("allProducts"));
    let cartItems = JSON.parse(localStorage.getItem("cart"));
    countElements(cartItems)
    function countElements(arr) {
        let num = 0;
        let cartNow = arr
        if (cartNow != null) {
            cartNow.map(element => num += element.quantity);
            $("#numberArticles").text(num.toString());
            return num;
        }
        $("#numberArticles").text("0");
        return 0;
    }
    if (countElements(cartItems) > 0) {
        showItems()
    }

    function showItems() {
        let cartItems = JSON.parse(localStorage.getItem("cart"));
        if (countElements(cartItems) != 0) {
            $(".empty").hide();
            let resultArr = [];
            cartItems.forEach(element => {
                resultArr.push(parseInt(element.id));
            });

            resultArr = allItems.filter(a => resultArr.includes(a.id));
            let price = 0;
            r = `       <table>
         <tr>
             <td><b>Articles</b></td>
             <td><b>Prices</b></td>
             <td><b> Quantity </b></td>
         </tr>`;
            resultArr.forEach(element => {
                r += `<tr>
            <td>${element.model}</td>
            <td>${element.price}€</td>`
                cartItems.forEach(element2 => {
                    if (element2.id == element.id) {
                        r += `<td data-id="${element2.id}" class='qunatity'><i class="fa fa-plus changeQunatity" aria-hidden="true"></i>
                    ${element2.quantity} <i class="fa fa-minus changeQunatity" aria-hidden="true"></i>
                     </td>`
                        price += (element.price * element2.quantity);
                    }
                });
                r += ` <td class='delete deleteItem'  data-key='${element.id}'><i class="fa fa-trash" aria-hidden="true"></i></td></tr>`;
            });

            r += ` <tr> <td id='total'>Total:</td>
         <td>${price}€</td>
         </tr><tr>
         <td id="withoutBg"></td>
         <td id="buy">Buy</td></tr>
         </table>`;
            document.getElementById("articlesList").innerHTML = r;
            deleteItem(cartItems);
            plusQuantity(cartItems)
            minusQuantity(cartItems)
        }
        else {
            document.getElementById("articlesList").innerHTML = "";
            $(".empty").show();
        }
    }

    function deleteItem(cartItems) {
        $('.deleteItem').click(function () {
            let id = $(this).data("key");
            cartItems.forEach((element, i) => {
                if (id == element.id) {
                    cartItems.splice(i, 1);
                }
            });
            localStorage.setItem("cart", JSON.stringify(cartItems));
            showItems()
        })
    }
    function plusQuantity(cartItems) {
        let plus = document.getElementsByClassName("fa-plus")
        for (let i = 0; i < plus.length; i++) {
            plus[i].addEventListener("click", function () {
                let id = plus[i].parentElement.getAttribute("data-id")
                if (countElements(cartItems) == 5) {
                    alert("5 articles is maximum in cart")
                }
                else {
                    cartItems.forEach(element => {
                        if (element.id == id) {
                            element.quantity += 1;
                        }
                    });
                }
                localStorage.setItem("cart", JSON.stringify(cartItems));
                showItems()
            })
        }
    }
    function minusQuantity(cartItems) {
        let plus = document.getElementsByClassName("fa-minus")
        for (let i = 0; i < plus.length; i++) {
            plus[i].addEventListener("click", function () {
                let id = plus[i].parentElement.getAttribute("data-id")

                cartItems.forEach((element, i) => {
                    if (cartItems.some(p => p.id == id)) {
                        if (element.quantity > 1) {
                            element.quantity -= 1;
                        }
                        else {
                            cartItems.splice(i, 1);
                        }
                    }
                });

                localStorage.setItem("cart", JSON.stringify(cartItems));
                showItems()
            })
        }
    }
});