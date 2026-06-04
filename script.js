const minusBtn = document.getElementById("productOneMinus")
const plusBtn = document.getElementById("productOnePlus")
const quantityOne = document.getElementById("productOneQuantity")



const closeCart = document.getElementById("closeCart");
const hoverCart = document.getElementById("hoverCart");

closeCart.addEventListener("click", () => {
    console.log("hei");
    hoverCart.style.display = 'none';
})



let quantity = 1

const addCart = document.getElementById("add-cart");

addCart.addEventListener("click", () => {
    addCart.textContent = "ADDED TO CART"
    addCart.style.backgroundColor = "#7FB23A";
    console.log("Adding", quantity, "items to cart");

    
    const cartItem = {
        name: "LITTLE TEMPERANCE",
        price: 18,
        quantity: quantity,
        size: "1KG",
        grind: "Espresso",
        image: "images/little_temperance.webp"
    };

    localStorage.setItem("cart", JSON.stringify(cartItem));
})

plusBtn.addEventListener("click", () => {
    quantity++;
    quantityOne.value = quantity;
})

minusBtn.addEventListener("click", () => {
    if (quantity > 1) {
        quantity--;
        quantityOne.value = quantity;
    }
})

//const quantity = Number(quantityOne.textContent);

function quantityPick() {
    if (minusBtn = 'click') {
        quantityOne -= 1;
    }

    if (plusBtn = 'click') {
        quantityOne += 1;
    }

    document.getElementById('#productOneQuantity').innerHTML = "quantityOne";
}




//====================================================================

const cartContainer = document.getElementById("cartContainer");

const cart = JSON.parse(localStorage.getItem("cart"));



if (!cart) {
    cartContainer.innerHTML = `
        <h2>YOUR CART IS EMPTY</h2>
    `
} else {
    const total = cart.price * cart.quantity

    cartContainer.innterHTML = `
        <div class="cart-row">

            <div class="cart-row-info">
                <img class="cart-image" src="images/little_temperance.webp">

                <div class="cart-row-middle">
                    <h2>LITTLE TEMPERANCE</h2>
                    
                    <p>$18.00<br>
                        Size: 1KG<br>
                        Grind: Espresso
                    </p>

                    <div class="cart-quantity-pick">
                        <button>-</button>
                        <span>1</span>
                        <button>+</button>
                    </div>
                </div>


            </div>

            <div class="cart-row-right">
                    <!--trash can
                <p>$18.00</p>
            </div>

        </div>
    `
}

