// import getCartItems from "../../scripts/cartService.js"; // getting errors when trying to import to reuse code

let products = [];

$(function() {
    // 
    toggleButton();
    products = JSON.parse(sessionStorage.getItem("products"));
});

function toggleButton() {
    // get cart item
    // get cart from storage
    // if issue with cart, re-initialize it
    let cart = [];
    let product = {};
    try {
        cart = JSON.parse(sessionStorage.getItem("cart"));
        product = JSON.parse(sessionStorage.getItem("currentProduct"));

        if(cart == null) {
        	cart = [];
        }

    } catch {
        sessionStorage.removeItem("cart");
        alert("error");
    }

    let div = document.getElementById("buttonGeneric");
    let button = document.createElement("button");
    // load different buttons             
    // in this product in your cart?
    if (!cart.find(p => p.id === product.id)) {
        button.appendChild(document.createTextNode("Add to cart"));
        button.setAttribute("class", "btn btn-success addToCart");
        button.setAttribute("style", "margin: 5px;");
        button.setAttribute("name", product.id);
    } else {
        // delete button            
        button.appendChild(document.createTextNode("Remove from cart"));
        button.setAttribute("class", "btn btn-danger removeFromCart");
        button.setAttribute("style", "margin: 5px;");
        button.setAttribute("name", product.id);
    }

    div.appendChild(button);
}

function navigate(page) {
    window.location = page;
}