$(function() {

    // add to cart
    $(document).on("click", ".addToCart", function(e) {
        alert("Your cart total is R " + addToCart(e.currentTarget.name));
        navigate("products.html");
    });

    // remove from cart
    $(document).on("click", ".removeFromCart", function(e) {
        alert("Your cart total is R " + removeFromCart(e.currentTarget.name));
        navigate("products.html");
    });

    // remove cart item, having hard time importing scritps for re-use
     $(document).on("click", ".removeFromCartItem", function(e) {
        alert("Your cart total is R " + removeFromCart(e.currentTarget.name));
        navigate("cart.html");
    });
});

function loadCart() {
    // get cart from storage
    // if issue with cart, re-initialize it
    let cart = [];
    try {
        cart = JSON.parse(sessionStorage.getItem("cart"));
        products = JSON.parse(sessionStorage.getItem("products"));

        if (cart === null) {
            alert("You have no items in your cart, lets get shopping!");
            cart = [];
        }
    } catch {
        sessionStorage.removeItem("cart");
    }

    if (cart.length == 0) {
        alert("You have not items in your cart. Lets get shopping!");
        navigate("products.html");
    }

    // draw html for each car and populate with object values
    for (let i = 0; i < cart.length; i++) {
        let cartItem = cart[i];

        if (cartItem === null) {
            continue;
        }

        let div = document.getElementById("cart");

        // create article         
        var article = document.createElement("article");
        article.setAttribute("class", "col-sm pb-4 m-1 w-25 h-25 border border-info shadow rounded");

        let button = document.createElement("button");
        // delete button            
        button.appendChild(document.createTextNode("X"));
        button.setAttribute("class", "btn btn-danger removeFromCartItem");
        button.setAttribute("style", "margin: 5px;");
        button.setAttribute("name", cartItem.id);
        article.appendChild(button);
        // append children items in article
        // anchor button link
        let anchorArtLink = document.createElement("a");
        anchorArtLink.setAttribute("class", "artlink");
        // anchorArtLink.href = "productdetails/" + product.productCode + ".html";

        let img = document.createElement("img");
        img.src = cartItem.image;
        img.setAttribute("class", "img-fluid mx-auto d-block w-25 mt-4 mb-2 img-thumbnail accordian navigate-image");
        img.setAttribute("id", cartItem.id);
        anchorArtLink.appendChild(img);

        let dl = document.createElement("dl");

        // name
        let dtName = document.createElement("dt");
        dtName.appendChild(document.createTextNode("Name"))
        dl.appendChild(dtName);

        let ddName = document.createElement("dd");
        ddName.appendChild(document.createTextNode(cartItem.name));
        dl.appendChild(ddName);

        // price
        let dtPrice = document.createElement("dt");
        dtPrice.appendChild(document.createTextNode("Price"))
        dl.appendChild(dtPrice);

        let ddPrice = document.createElement("dd");
        ddPrice.appendChild(document.createTextNode("R " + cartItem.price));
        dl.appendChild(ddPrice);

        // populate view        
        // Add it to the list:            
        anchorArtLink.appendChild(dl);
        // anchorArtLink.appendChild(button);
        article.appendChild(anchorArtLink);
        div.appendChild(article);
    }

    // total
    let div = document.getElementById("total");

    // create article         
    let articleCoupon = document.createElement("article");
    articleCoupon.setAttribute("class", "col-sm pb-4 m-1 w-100 h-25 border border-info shadow rounded");    

    let tbl = document.createElement("table");
    tbl.setAttribute("class", "table");

    let row0 = document.createElement("tr");

    let col1 = document.createElement("td");
    col1.setAttribute("style", "font-size: 35px;");
    col1.appendChild(document.createTextNode("Vat"));

    let col2 = document.createElement("td");
    col2.setAttribute("style", "font-size: 35px;");
    col2.setAttribute("id", "vat");
    col2.appendChild(document.createTextNode("R " + (calculateCart() * 0.15)));

    let row1 = document.createElement("tr");

    let col3 = document.createElement("td");
    col3.setAttribute("style", "font-size: 50px; font-style: italic;");
    col3.appendChild(document.createTextNode("Total"));

    let col4 = document.createElement("td");
    col4.setAttribute("style", "font-size: 50px; font-style: italic;");
    col4.appendChild(document.createTextNode("R " + calculateCart()));

    row0.appendChild(col1);
    row0.appendChild(col2);
    row1.appendChild(col3);
    row1.appendChild(col4);
    tbl.appendChild(row0);
    tbl.appendChild(row1);
    articleCoupon.appendChild(tbl);
    div.appendChild(articleCoupon);
}

function addToCart(id) {
    // get product from list
    let product = products[parseInt(id)];
    // load cart    	
    let cart = JSON.parse(sessionStorage.getItem("cart"));

    // begin new list?
    if (cart === null) {
        cart = [];
    }
    // add product to cart
    cart.push(product);
    // overwrite current cart
    sessionStorage.setItem("cart", JSON.stringify(cart));

    return calculateCart();
}

function removeFromCart(id) {
    // get product from list
    let product = products[parseInt(id)];
    // load cart
    let cart = JSON.parse(sessionStorage.getItem("cart"));
    // remove product                
    cart.splice(cart.map(e => e.id).indexOf(product.id), 1);
    // overwrite current cart
    sessionStorage.setItem("cart", JSON.stringify(cart));

    return calculateCart();
}

function calculateCart() {
    // load cart
    let cart = JSON.parse(sessionStorage.getItem("cart"));

    let total = cart.reduce((accumulator, currentValue) => accumulator + currentValue.total, 0);
    // alert("Your cart total is R " + total);
    return total;
}

function navigate(page) {
    window.location = page;
}