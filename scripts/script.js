const productOneCount = 1
const minusCount = document.getElementById("productOneMinus")
const addCount = document.getElementById("productOnePlus")
const productOneCount = document.getElementById('#productOneQuantity')


function quantityPick() {
    if (minusCount = 'click') {
        productOneCount -= 1
    }

    if (plusCount = 'click') {
        productOneCount += 1
    }

    document.getElementById('#productOneQuantity').innerHTML = "productOneCount"

    
}

addCount.addEventListener("click", () => {
    productOneCount.value = Number(productOneCount.value) + 1;
})


minusCount.addEventListener("click", () => {
    if (Number(productOneCount,value) > 1) {
        productOneCount.value = Number(productOneCount.value) - 1;
    }
});



const closeCart = document.getElementById("closeCart");

closeCart.addEventListener("click", () => {
    document.querySelector(".cart-wrapper").classList.remove("open");
})







