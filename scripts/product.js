let products = [];
let cart = [];

// $(document).ready(); put here as a reminder
// functionality on page
$(function() {
    // load all products
    productListHtml();

    // ******************* initialize screen *****************//
    // initialize accordians
    var allPanels = $(".accordian").next("dl").hide();

    // subscribe img hover for accordian effect
    $(".accordian").mouseenter(function(e) {
        let dl = $(this).next("dl");
        dl.slideDown();        
    });

    $(".accordian").mouseleave(function(e) {
        let dl = $(this).next("dl");
        dl.slideUp();        
    });

    // navigate to product detail
    $(document).on("click", ".navigate-image", function(e) {
        let a = $(this);
        let product = products[a[0].id];
        // store current item
        sessionStorage.setItem("currentProduct", JSON.stringify(product));
        navigate(product.productCode + ".html");
    });    
});

// html view for products
function productListHtml() {
    // add dummy products
    products.push(new Product(
        0,
        "Software Engineering",
        25000.00,
        isCartItem = false,
        image = "../images/se.png",
        productCode = "se"
    ));
    products.push(new Product(
        1,
        "Full Stack Web Dev",
        28000.00,
        isCartItem = false,
        image = "../images/wd.png",
        productCode = "wd"
    ));
    products.push(new Product(
        2,
        "Data Science",
        35000.00,
        isCartItem = false,
        image = "../images/ds.png",
        productCode = "ds"
    ));
    products.push(new Product(
        3,
        "LG Stereo",
        12000.00,
        isCartItem = false,
        image = "../images/soundsystem.jpg",
        productCode = "lg"
    ));
    products.push(new Product(
        4,
        "Redragon Desktop",
        10000.00,
        isCartItem = false,
        image = "../images/desktop.jpg",
        productCode = "dt"
    ));

    // store products
    sessionStorage.setItem("products", JSON.stringify(products));

    // get cart from storage
    // if issue with cart, re-initialize it
    let cart = [];
    try {
        cart = JSON.parse(sessionStorage.getItem("cart"));

        if(cart === null) {
        	alert("You have no items in your cart, lets get shopping!");
        	cart = [];
        }
    } catch {
        sessionStorage.removeItem("cart");
    }

    // draw html for each item and populate with object values
    for (let i = 0; i < products.length; i++) {
        let product = products[i];

        if (product === null) {
            continue;
        }

        let div = document.getElementById("productList");

        // create article         
        var article = document.createElement("article");
        article.setAttribute("class", "col-sm pb-4 m-1 w-75 h-25 border border-info shadow rounded");
        // append children items in article
        // anchor button link
        let anchorArtLink = document.createElement("a");
        anchorArtLink.setAttribute("class", "artlink");
        // anchorArtLink.href = "productdetails/" + product.productCode + ".html";

        let img = document.createElement("img");
        img.src = product.image;
        img.setAttribute("class", "img-fluid mx-auto d-block mt-4 mb-2 img-thumbnail accordian navigate-image");
        img.setAttribute("id", product.id);
        anchorArtLink.appendChild(img);

        let dl = document.createElement("dl");

        // name
        let dtName = document.createElement("dt");
        dtName.appendChild(document.createTextNode("Name"))
        dl.appendChild(dtName);

        let ddName = document.createElement("dd");
        ddName.appendChild(document.createTextNode(product.name));
        dl.appendChild(ddName);

        // price
        let dtPrice = document.createElement("dt");
        dtPrice.appendChild(document.createTextNode("Price"))
        dl.appendChild(dtPrice);

        let ddPrice = document.createElement("dd");
        ddPrice.appendChild(document.createTextNode("R " + product.price));
        dl.appendChild(ddPrice);

        // vat
        let dtVat = document.createElement("dt");
        dtVat.appendChild(document.createTextNode("Vat"))
        dl.appendChild(dtVat);

        let ddVat = document.createElement("dd");
        ddVat.appendChild(document.createTextNode("R " + product.vat));
        dl.appendChild(ddVat);

        // Total 
        let dtTotal = document.createElement("dt");
        dtTotal.appendChild(document.createTextNode("Total"));
        dl.appendChild(dtTotal);

        let ddTotal = document.createElement("dd");
        ddTotal.appendChild(document.createTextNode("R " + product.total));
        dl.appendChild(ddTotal);

        let button = document.createElement("a");
        // in this product in your cart?
        if (!cart.find(p => p.id === product.id)) {
            button.appendChild(document.createTextNode("Add to cart"));
            button.setAttribute("class", "btn btn-success addToCart");
            button.setAttribute("style", "margin: 5px; color: white;");
            button.setAttribute("name", product.id);
        } else {
            // delete button            
            button.appendChild(document.createTextNode("Remove from cart"));
            button.setAttribute("class", "btn btn-danger removeFromCart");
            button.setAttribute("style", "margin: 5px; color: white;");
            button.setAttribute("name", product.id);
        }

        // let button = document.createElement("button");
        // // in this product in your cart?
        // if (!cart.find(p => p.id === product.id)) {
        //     button.appendChild(document.createTextNode("Add to cart"));
        //     button.setAttribute("class", "btn btn-success addToCart");
        //     button.setAttribute("style", "margin: 5px;");
        //     button.setAttribute("name", product.id);
        // } else {
        //     // delete button            
        //     button.appendChild(document.createTextNode("Remove from cart"));
        //     button.setAttribute("class", "btn btn-danger removeFromCart");
        //     button.setAttribute("style", "margin: 5px;");
        //     button.setAttribute("name", product.id);
        // }

        // populate view        
        // Add it to the list:            
        anchorArtLink.appendChild(dl);
        anchorArtLink.appendChild(button);
        article.appendChild(anchorArtLink);
        div.appendChild(article);
    }
}

function Product(id, name, price, isCartItem, image, productCode) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.vat = ((this.price * 15) / 100);
    this.isCartItem = isCartItem;    
    this.total = this.price + ((this.price * 15) / 100);
    this.image = image;
    this.productCode = productCode;
}

function navigate(page) {
    window.location = page;
}