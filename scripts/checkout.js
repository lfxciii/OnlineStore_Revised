let currentShippingType = "Collection";
let prevShippingFee = 0;
let couponNumber = "N/A";

$(function() {

    sessionStorage.removeItem("coupon");

    // coupon submission
    $(document).on("click", "#btnCoupon", function() {
        couponNumber = $("#couponNumber").val();

        if (couponNumber !== "") {
            sessionStorage.setItem("coupon", 23.00);
            alert("Counpon " + couponNumber + " activated.");
            let totalValue = calculateCart();
            $("#cartTotal").text("R " + totalValue);
            $("#couponFee").text("- R 25.00 (" + couponNumber + ")");     
            $("#vat").text("R " + (calculateCart() * 0.15));                        
        } else {
            alert("Please enter a coupon number");
        }
    });

     // checkout submission
    $(document).on("click", "#btnCheckout", function() {
        var number = Math.floor((Math.random() * 1000000) + 1);
        alert("Order submitted, Reference number : " + number);
        navigate("products.html");
        currentShippingType = "Collection";
        prevShippingFee = 0;
        couponNumber = "N/A";
        sessionStorage.removeItem("cart");
        sessionStorage.removeItem("coupon");
    });

    // shipping type radio buttons
    $(document).on("click", ".shippingType", function() {
        // total value
        let totalValue = 0;
        // get shipping type value
        currentShippingType = $(this).next("label").text();

        totalValue = calculateCart();

        if (currentShippingType === "Door to door") {
            prevShippingFee = 15.00;
            totalValue += 15.00;
        } else if (currentShippingType === "Post") {
            prevShippingFee = 25.00;
            totalValue += 25.00;
        } else { // collection free         
            prevShippingFee = 0;
            totalValue += 0;
        }

        $("#cartTotal").text("R " + totalValue);
        $("#shipFee").text("R " + prevShippingFee);
        $("#vat").text("R " + (parseFloat(totalValue) * 0.15));            
    });
});

function loadCheckout() {
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

    // draw html for each item and populate with object values
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


    // *****************************************************************************************

    // coupon
    let divCoup = document.getElementById("coupon");

    // create article         
    let articleCoupon = document.createElement("article");
    articleCoupon.setAttribute("class", "col-sm pb-4 m-1 w-75 h-25 border border-info shadow rounded");

    // header
    let h2 = document.createElement("h2");
    h2.appendChild(document.createTextNode("Coupon details"));
    articleCoupon.appendChild(h2);

    let p = document.createElement("p");
    p.setAttribute("style", "font-style: italic;");
    p.appendChild(document.createTextNode("if you have a coupon, enter the number and cliam your discount!"));
    articleCoupon.appendChild(p);

    let couponNumber = document.createElement("input");
    couponNumber.setAttribute("class", "form-control");
    couponNumber.setAttribute("id", "couponNumber");
    articleCoupon.appendChild(couponNumber);

    let btnCoupon = document.createElement("button");
    btnCoupon.setAttribute("class", "btn btn-success w-25 h-25 submitCoupon");
    btnCoupon.setAttribute("style", "margin: 5px;");
    btnCoupon.setAttribute("id", "btnCoupon");
    btnCoupon.appendChild(document.createTextNode("Submit coupon"));
    articleCoupon.appendChild(btnCoupon);

    // *****************************************************************************************

    // shipping     
    let divShipping = document.getElementById("shipping");

    // create article         
    let articleShipping = document.createElement("article");
    articleShipping.setAttribute("class", "col-sm pb-4 m-1 w-75 h-25 border border-info shadow rounded");

    let h2Shipping = document.createElement("h2");
    h2Shipping.appendChild(document.createTextNode("Shipping details"));
    articleShipping.appendChild(h2Shipping);

    let tblShipping = document.createElement("table");
    tblShipping.setAttribute("class", "table");

    let rowShipping0 = document.createElement("tr");
    let colShipping1 = document.createElement("td");
    colShipping1.setAttribute("style", "font-size: 25px;");
    colShipping1.appendChild(document.createTextNode("Address"));

    let colShipping2 = document.createElement("td");
    colShipping2.setAttribute("style", "font-size: 25px;");
    colShipping2.appendChild(document.createTextNode("143 Starlight road, Nibiru, 1903"));
    rowShipping0.appendChild(colShipping1);
    rowShipping0.appendChild(colShipping2);

    // 
    let rowShipping2 = document.createElement("tr");
    let colShipping5 = document.createElement("td");
    colShipping5.setAttribute("style", "font-size: 25px;");
    colShipping5.appendChild(document.createTextNode("Shipping type"));

    // create radio buttons
    let colShipping6 = document.createElement("td");
    colShipping6.setAttribute("style", "font-size: 25px;");

    // door to door
    let divDoorToDoor = document.createElement("div");
    divDoorToDoor.setAttribute("class", "custom-control custom-radio custom-control-inline");
    let input1 = document.createElement("input");
    input1.setAttribute("type", "radio");
    input1.setAttribute("class", "custom-control-input shippingType");
    input1.setAttribute("id", "defaultInline1");
    input1.setAttribute("name", "inlineDefaultRadiosExample");
    divDoorToDoor.appendChild(input1);

    let label1 = document.createElement("label");
    label1.setAttribute("class", "custom-control-label");
    label1.setAttribute("for", "defaultInline1");
    label1.appendChild(document.createTextNode("Door to door"));
    divDoorToDoor.appendChild(label1);

    // collection
    let divCollection = document.createElement("div");
    divCollection.setAttribute("class", "custom-control custom-radio custom-control-inline");
    let input2 = document.createElement("input");
    input2.setAttribute("type", "radio");
    input2.setAttribute("class", "custom-control-input shippingType");
    input2.setAttribute("id", "defaultInline2");
    input2.setAttribute("name", "inlineDefaultRadiosExample");
    divCollection.appendChild(input2);

    let label2 = document.createElement("label");
    label2.setAttribute("class", "custom-control-label");
    label2.setAttribute("for", "defaultInline2");
    label2.appendChild(document.createTextNode("Collection"));
    divCollection.appendChild(label2);

    // post
    let divPost = document.createElement("div");
    divPost.setAttribute("class", "custom-control custom-radio custom-control-inline");
    let input3 = document.createElement("input");
    input3.setAttribute("type", "radio");
    input3.setAttribute("class", "custom-control-input shippingType");
    input3.setAttribute("id", "defaultInline3");
    input3.setAttribute("name", "inlineDefaultRadiosExample");
    divPost.appendChild(input3);

    let label3 = document.createElement("label");
    label3.setAttribute("class", "custom-control-label");
    label3.setAttribute("for", "defaultInline3");
    label3.appendChild(document.createTextNode("Post"));
    divPost.appendChild(label3);


    colShipping6.appendChild(divDoorToDoor);
    colShipping6.appendChild(divCollection);
    colShipping6.appendChild(divPost);

    rowShipping2.appendChild(colShipping5);
    rowShipping2.appendChild(colShipping6);

    //
    let rowShipping1 = document.createElement("tr");
    let colShipping3 = document.createElement("td");
    colShipping3.setAttribute("style", "font-size: 25px; font-style: none;");
    colShipping3.appendChild(document.createTextNode("Payment method"));

    let colShipping4 = document.createElement("td");
    colShipping4.setAttribute("style", "font-size: 25px; font-style: none;");
    colShipping4.appendChild(document.createTextNode("Credit Card"));
    rowShipping1.appendChild(colShipping3);
    rowShipping1.appendChild(colShipping4);

    tblShipping.appendChild(rowShipping0);
    tblShipping.appendChild(rowShipping2);
    tblShipping.appendChild(rowShipping1);

    articleShipping.appendChild(tblShipping);


    // *****************************************************************************************

    // total
    let div = document.getElementById("total");

    // create article         
    let articleTotal = document.createElement("article");
    articleTotal.setAttribute("class", "col-sm pb-4 m-1 w-75 h-25 border border-info shadow rounded");

    let tblTotal = document.createElement("table");
    tblTotal.setAttribute("class", "table");

    let rowCoupon0 = document.createElement("tr");

    let colCoupon1 = document.createElement("td");
    colCoupon1.setAttribute("style", "font-size: 25px;");
    colCoupon1.appendChild(document.createTextNode("Coupon"));

    let colCoupon2 = document.createElement("td");
    colCoupon2.setAttribute("id", "couponFee");
    colCoupon2.setAttribute("style", "font-size: 25px;");
    colCoupon2.appendChild(document.createTextNode("N/A"));

    let rowShipFee0 = document.createElement("tr");
    let colShipFee1 = document.createElement("td");
    colShipFee1.setAttribute("style", "font-size: 25px;");
    colShipFee1.appendChild(document.createTextNode("Shipping fee"));

    let colShipFee2 = document.createElement("td");
    colShipFee2.setAttribute("id", "shipFee");
    colShipFee2.setAttribute("style", "font-size: 25px;");
    colShipFee2.appendChild(document.createTextNode("R " + prevShippingFee));

    let rowVat = document.createElement("tr");
    let colVat0 = document.createElement("td");
    colVat0.setAttribute("style", "font-size: 25px;");
    colVat0.appendChild(document.createTextNode("Vat"));

    let colVat1 = document.createElement("td");
    colVat1.setAttribute("id", "vat");
    colVat1.setAttribute("style", "font-size: 25px;");
    colVat1.appendChild(document.createTextNode("R " + (calculateCart() * 0.15)));

    let rowTotal1 = document.createElement("tr");
    let colTotal3 = document.createElement("td");
    colTotal3.setAttribute("style", "font-size: 50px; font-style: italic;");
    colTotal3.appendChild(document.createTextNode("Total"));

    let colTotal4 = document.createElement("td");
    colTotal4.setAttribute("id", "cartTotal");
    colTotal4.setAttribute("style", "font-size: 50px; font-style: italic;");
    colTotal4.appendChild(document.createTextNode("R " + calculateCart()));

    rowCoupon0.appendChild(colCoupon1);
    rowCoupon0.appendChild(colCoupon2);
    rowShipFee0.appendChild(colShipFee1);
    rowShipFee0.appendChild(colShipFee2);
    rowVat.appendChild(colVat0);
    rowVat.appendChild(colVat1);
    rowTotal1.appendChild(colTotal3);
    rowTotal1.appendChild(colTotal4);
    
    tblTotal.appendChild(rowCoupon0);
    tblTotal.appendChild(rowShipFee0);
    tblTotal.appendChild(rowVat);
    tblTotal.appendChild(rowTotal1);
    articleTotal.appendChild(tblTotal);

    // *****************************************************************************************

    let btnCheckout = document.createElement("button");
    btnCheckout.setAttribute("class", "btn btn-success w-25 h-25 submitCoupon");
    btnCheckout.setAttribute("style", "margin: 5px;");
    btnCheckout.setAttribute("id", "btnCheckout");
    btnCheckout.appendChild(document.createTextNode("Checkout"));
    articleTotal.appendChild(btnCheckout);

    divCoup.appendChild(articleCoupon);
    divShipping.appendChild(articleShipping);
    div.appendChild(articleTotal);
}

function calculateCart() {
    // load cart
    let cart = JSON.parse(sessionStorage.getItem("cart"));
    let total = cart.reduce((accumulator, currentValue) => accumulator + currentValue.total, 0);
    // calculate coupon id present
    let coupon = sessionStorage.getItem("coupon");

    if (coupon > 0) {
        total = total - coupon;
    }

    return total;
}

function navigate(page) {
    window.location = page;
}