//===================================================================================

const closeCart = document.getElementById("closeCart");
const hoverCart = document.getElementById("hoverCart");
const cartBtn = document.getElementById("cartBtn")

closeCart.addEventListener("click", () => {
    hoverCart.style.display = 'none';
})

cartBtn.addEventListener("mouseenter", () => {
    hoverCart.style.display = 'block';
    renderHoverCart;
})

cartBtn.addEventListener("mouseleave", () => {
    hoverCart.style.display = 'none';
})



//===================================================================================

let quantity = 1

const addCart = document.getElementById("add-cart");

if (addCart) {
    addCart.addEventListener("click", () => {
        addCart.textContent = "ADDED TO CART"
        addCart.style.backgroundColor = "#7FB23A";
        //console.log("Adding", quantity, "items to cart");

        const cartItem = {
            id: "one",
            name: "LITTLE TEMPERANCE",
            price: 18,
            quantity: quantity,
            size: "1KG",
            grind: "Espresso",
            image: "images/little_temperance.webp"
        };

        localStorage.setItem("cart", JSON.stringify(cartItem));
    })
}



//===================================================================================

function getCart() {
    return JSON.parse(localStorage.getItem("cart"));
}

//===================================================================================

const cartContainer = document.getElementById("cartContainer");

if(cartContainer) {
    renderCart();
}

function renderCart() {

    const cart = getCart();


    if (!cart) {
        cartContainer.innerHTML = `
            <h2 class="empty-cart">YOUR CART IS EMPTY</h2>
            <a class="cart-continue" href="product-list.html">CONTINUE SHOPPING</a>
        `
    } else {
        const total = cart.price * cart.quantity

        cartContainer.innerHTML = `
            <div class="cart-row">

                <div class="cart-row-info">
                    <img class="cart-image" src="images/little_temperance.webp">

                    <div class="cart-row-middle">
                        <h2>${cart.name}</h2>
                        
                        <p>$${cart.price.toFixed(2)}<br>
                            Size: ${cart.size}<br>
                            Grind: ${cart.grind}
                        </p>

                        <div class="cart-quantity-pick">
                            <button class="product-one-minus">-</button>
                            <input class="product-one-quantity" type="number" value="${cart.quantity}" min="1">
                            <button class="product-one-plus">+</button>
                        </div>
                    </div>
                </div>

                <div class="cart-row-right">
                    <button class="cart-remove">
                        <img class="cart-trash" src="images/trash_icon.png">
                    </button>
                    
                    <p>$${cart.price.toFixed(2)}</p>
                </div>
            </div>

            <div class="cart-checkout">
                <div class="cart-price">
                    <p>Subtotal</p>
                    <p>$${total.toFixed(2)}</p>
                </div>

                <a href="checkout.html">CHECKOUT</a>
            </div>
        `
    }




    const cartRemove = cartContainer.querySelector(".cart-remove");

    if (cartRemove) {
        cartRemove.addEventListener("click", () => {
            localStorage.removeItem("cart");
            renderCart();
        })
    }

    //----------------------------------------------------------------

    const minusBtn = cartContainer.querySelector(".product-one-minus")
    const plusBtn = cartContainer.querySelector(".product-one-plus")
    const quantityOne = cartContainer.querySelector(".product-one-quantity")


    if (plusBtn) {
        plusBtn.addEventListener("click", () => {
            increaseQuantity();
        })
    }


    if (minusBtn) {
        minusBtn.addEventListener("click", () => {
            decreaseQuantity();
        })
    }


    //----------------------------------------------------------------
    
}


const emptyText = document.getElementById("emptyText");
const hoverContainer = document.getElementById("hoverContainer");


hoverCart.addEventListener("mouseenter", () => {
    renderHoverCart();
})

function renderHoverCart() {
    const cart = getCart();

    if (!cart) {
        hoverContainer.innerHTML = "";

        emptyText.style.display = "block";
        closeCart.style.display = "block";

        return;
    }

    if (emptyText) {
        emptyText.style.display = "none";
    }

    if (closeCart) {
        closeCart.style.display = "none";
    }

    hoverContainer.innerHTML = `
        <div class="hover-item">
            <img class="hover-container-image-one" src="images/little_temperance.webp">
        
            <div class="hover-cart-info">
                <h2>LITTLE TEMPERANCE</h2>
                <p>
                    Size: 1KG<br>
                    Grind: Espresso
                </p>
        
                <div class="hover-cart-quantity-pick">
                    <button class="product-one-minus">-</button>
                    <input class="product-one-quantity" type="number" value="${cart.quantity}" min="1">
                    <button class="product-one-plus">+</button>
                </div>
            </div>

            <div class="hover-cart-right">
                <button class="cart-remove">
                    <img class="hover-cart-trash" src="images/trash_icon.png">
                </button>
                
                <p>$18.00</p>
            </div>
        </div>
            
        <a class="hover-cart-checkout" href="cart.html">GO TO CART</a>
    `

    const hoverRemove = hoverContainer.querySelector(".cart-remove");

    if (hoverRemove) {
        hoverRemove.addEventListener("click", () => {
            localStorage.removeItem("cart");

            renderHoverCart();
            renderCart();
        });
    }

    const minusBtn = hoverContainer.querySelector(".product-one-minus")
    const plusBtn = hoverContainer.querySelector(".product-one-plus")
    const quantityOne = hoverContainer.querySelector(".product-one-quantity")


    if (plusBtn) {
        plusBtn.addEventListener("click", () => {
            increaseQuantity();
        })
    }


    if (minusBtn) {
        minusBtn.addEventListener("click", () => {
            decreaseQuantity();
        })
    }
}


//Helper function for universal quantity plus

function increaseQuantity() {
    const cart = getCart();
    cart.quantity++;

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();
    renderHoverCart();
}

//Helper function for universal quantity minus

function decreaseQuantity() {
    const cart = getCart();

    if (cart.quantity > 1) {
        cart.quantity--;

        localStorage.setItem("cart", JSON.stringify(cart));

        renderCart();
        renderHoverCart();
    }
}

//Helper function for universal quantity input type

function setQuantity(newQuantity) {
    const cart = getCart();

    cart.quantity = Math.max(1, newQuantity);
    
    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();
    renderHoverCart();
}


const productContainer = document.getElementById("productContainer");

if (productContainer) {

    const minusBtn = productContainer.querySelector(".product-one-minus");
    const plusBtn = productContainer.querySelector(".product-one-plus");
    const quantityInputOne = productContainer.querySelector(".product-one-quantity");


    if (plusBtn) {
        plusBtn.addEventListener("click", () => {
            quantity++;
            quantityInputOne.value = quantity;
        })
    }

    if (minusBtn) {
        minusBtn.addEventListener("click", () => {
            if (quantity > 1) {
                quantity--;
                quantityInputOne.value = quantity;
            }
        })
    }
}



