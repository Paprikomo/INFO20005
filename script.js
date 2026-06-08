//===================================================================================

const closeCart = document.getElementById("closeCart");
const hoverCart = document.getElementById("hoverCart");
const cartBtn = document.getElementById("cartBtn")

closeCart.addEventListener("click", () => {
    hoverCart.style.display = 'none';
})

cartBtn.addEventListener("mouseenter", () => {
    hoverCart.style.display = 'block';
    renderHoverCart();
})

cartBtn.addEventListener("mouseleave", () => {
    hoverCart.style.display = 'none';
})



//===================================================================================

let quantity = 1

const addCart = document.getElementById("add-cart");

const productOneSize = document.querySelectorAll('input[name="product-one-size"]');
const productOneGrind = document.querySelectorAll('input[name="product-one-grind"]');

if (addCart) {
    addCart.addEventListener("click", () => {
        
        const selectedGrind = document.querySelector('input[name="product-one-grind"]:checked')?.value;
        const selectedSize = document.querySelector('input[name="product-one-size"]:checked')?.value;

        addCart.textContent = "ADDED TO CART"
        addCart.style.backgroundColor = "#7FB23A";
        //console.log("Adding", quantity, "items to cart");

        const productContainer = document.getElementById("productContainer");

        if (productContainer) {

            const productId = productContainer.dataset.productId;

            let productInfo;

            if (productId === "one") {
                productInfo = {
                    id: "one",
                    name: "LITTLE TEMPERANCE",
                    price: 18,
                    image: "images/little_temperance.webp"
                };
            }

            if (productId === "two") {
                productInfo = {
                    id: "two",
                    name: "SWISS WATER DECAF",
                    price: 18,
                    image: "images/swiss_water_decaf.webp"
                };
            }
                
            const cartItem = {
                ...productInfo,
                quantity,
                size: selectedSize,
                grind: selectedGrind
            };

            let cart = getCart();

            const existing = cart.find(
                item => item.id === cartItem.id
            );

            if (existing) {
                existing.quantity += cartItem.quantity;
            } else {
                cart.push(cartItem);
            }

            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );
        }
    })
}


//===================================================================================

function getCart() {
    const data = JSON.parse(localStorage.getItem("cart"));

    if (!data) return [];

    if (!Array.isArray(data)) {
        return [data];
    }

    return data;
}

//===================================================================================

const cartContainer = document.getElementById("cartContainer");

if(cartContainer) {
    renderCart();
}

function renderCart() {

    const cartItems = getCart();


    if (cartItems.length === 0) {
        cartContainer.innerHTML = `
            <h2 class="empty-cart">YOUR CART IS EMPTY</h2>
            <a class="cart-continue" href="product-list.html">CONTINUE SHOPPING</a>
        `
        return;
    }

    let total = 0

    cartContainer.innerHTML = cartItems.map(item => {
        
        total += item.price * item.quantity

        return `
            <div class="cart-row">

                <div class="cart-row-info">
                    <img class="cart-image" src="${item.image}">

                    <div class="cart-row-middle">
                        <h2>${item.name}</h2>
                        
                        <p>$${item.price.toFixed(2)}<br>
                            Size: ${item.size}<br>
                            Grind: ${item.grind}
                        </p>

                        <div class="cart-quantity-pick">
                            <button class="product-one-minus" data-id="${item.id}">-</button>
                            <input class="product-one-quantity" 
                            data-id="${item.id}"
                            type="number" 
                            value="${item.quantity}" 
                            min="1">
                            <button class="product-one-plus" data-id="${item.id}">+</button>
                        </div>
                    </div>
                </div>

                <div class="cart-row-right">
                    <button class="cart-remove" data-id="${item.id}">
                        <img class="cart-trash" src="images/trash_icon.png">
                    </button>
                    
                    <p>$${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            </div>
        `;
    }).join("");

    cartContainer.innerHTML += `
        <div class="cart-checkout">
            <div class="cart-price">
                <p>Subtotal</p>
                <p>$${total.toFixed(2)}</p>
            </div>

            <a href="checkout.html">CHECKOUT</a>
        </div>
    `

    
    //----------------------------------------------------------------

    cartContainer.querySelectorAll(".cart-remove").forEach(btn => {
        btn.addEventListener("click", () => {

            const id = btn.dataset.id;

            let cart = getCart();

            cart = cart.filter(item => item.id !== id);

            localStorage.setItem("cart", JSON.stringify(cart));

            renderCart();
            renderHoverCart();
        });
    });


    //----------------------------------------------------------------

    cartContainer.querySelectorAll(".product-one-minus").forEach(btn => {
        btn.addEventListener("click", () => {

            const id = btn.dataset.id;

            const item = getCart().find(item => item.id === id);

            setQuantity(id, -1); 
        })
    });

    cartContainer.querySelectorAll(".product-one-plus").forEach(btn => {
        btn.addEventListener("click", () => {

            const id = btn.dataset.id;

            const item = getCart().find(item => item.id === id);

            setQuantity(id, +1); 
        })
    });

    cartContainer.querySelectorAll(".product-one-quantity").forEach(input => {
        input.addEventListener("change", () => {

            const id = input.dataset.id;

            setQuantity(id, parseInt(input.value));
        });
    });

}

//------------------------------------------------------------------------------------------
//Hover Cart

const emptyText = document.getElementById("emptyText");
const hoverContainer = document.getElementById("hoverContainer");


hoverCart.addEventListener("mouseenter", () => {
    renderHoverCart();
})

function renderHoverCart() {
    const cartItems = getCart();

    if (cartItems.length === 0) {
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

    hoverContainer.innerHTML = cartItems.map(item => `
        <div class="hover-item">
            <img class="hover-container-image-one" src="${item.image}">

            <div class="hover-cart-info">
                <h2>${item.name}</h2>

                <p>
                    Size: ${item.size}<br>
                    Grind: ${item.grind}
                </p>

                <div class="hover-cart-quantity-pick">
                    <button class="product-one-minus" data-id="${item.id}">-</button>
                    <input class="product-one-quantity"
                        data-id="${item.id}"
                        type="number"
                        value="${item.quantity}"
                        min="1">
                    <button class="product-one-plus" data-id="${item.id}">+</button>
                </div>
            </div>

            <div class="hover-cart-right">
                <button class="cart-remove" data-id="${item.id}">
                    <img class="hover-cart-trash" src="images/trash_icon.png">
                </button>

                <p>$${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        </div>
    `).join("");

    hoverContainer.innerHTML += `
        <a class="hover-cart-checkout" href="cart.html">GO TO CART</a>
    `


    hoverContainer.onclick = (e) => {
        const btn = e.target.closest(".cart-remove");
        if (!btn) return;

        const id = btn.dataset.id;

        let cart = getCart();
        cart = cart.filter(item => item.id !== id);

        localStorage.setItem("cart", JSON.stringify(cart));

        renderHoverCart();
        renderCart();
    };

    hoverContainer.querySelectorAll(".product-one-plus").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            setQuantity(id, 1);
        });
    });

    hoverContainer.querySelectorAll(".product-one-minus").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            setQuantity(id, -1);
        });
    });

    hoverContainer.querySelectorAll(".product-one-quantity").forEach(input => {
        input.addEventListener("change", () => {
            const id = input.dataset.id;
            const value = parseInt(input.value);

            setQuantityAbsolute(id, value);
        });
    });
}


//Helper function for universal quantity

function setQuantity(id, delta) {
    let cart = getCart();

    const item = cart.find(p => p.id === id);
    if (!item) return;

    item.quantity = Math.max(1, item.quantity + delta);

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();
    renderHoverCart();
}

//Helper function for universal quantity input using typing

function setQuantityAbsolute(id, value) {
    let cart = getCart();

    const item = cart.find(p => p.id === id);
    if (!item) return;

    item.quantity = Math.max(1, value);

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


