function navToWelcomePage() {
    window.location.href = "WelcomePage.html";
}

function navToCheckoutPage() {
    window.location.href = "CheckoutPage.html";
}

function navToListofRestaurants() {
    window.location.href = "RestoList.html";
}

function navToMenuPage(index) {
    localStorage.setItem("allRestosIndex",JSON.stringify(index));
    window.location.href = "RestoMenu.html";
}

function backToMenuPage(){
    window.location.href = "RestoMenu.html";
}

function navToOrderPage() {
    window.location.href = "OrderPage.html";
}

class Restaurant {
    constructor(title, logo, rating, address, restoType, priceRange, openTimes, menuItemsArray){
        this.title=title;
        this.logo=logo;
        this.rating=rating;
        this.address=address;
        this.restoType=restoType;
        this.priceRange=priceRange;
        this.openTimes=openTimes;
        this.menuItemsArray=menuItemsArray;
    }
}

class menuItem {
    constructor(name, image, price, description){
        this.name=name;
        this.image=image;
        this.price=price;
        this.description=description;
        this.quantity=0;
    }
}

var allRestos = [];

function populateRestos(){
    allRestos = getRestos();
    localStorage.setItem("allRestos", JSON.stringify(allRestos));
    var i;

    for(i=0;i<allRestos.length;i++){
        var image = document.createElement("img");
        image.setAttribute("src", allRestos[i].logo);
        document.getElementById("searchedRestos").appendChild(image);


        var attList = document.createElement("ul");
        
        var rating = document.createElement("li");
        rating.innerHTML = allRestos[i].rating;
        attList.appendChild(rating);

        var address = document.createElement("li");
        address.innerHTML = allRestos[i].address;
        attList.appendChild(address);

        var restoType = document.createElement("li");
        restoType.innerHTML = allRestos[i].restoType;
        attList.appendChild(restoType);

        var priceRange = document.createElement("li");
        priceRange.innerHTML = allRestos[i].priceRange;
        attList.appendChild(priceRange);

        var openTimes = document.createElement("li");
        openTimes.innerHTML = allRestos[i].openTimes;
        attList.appendChild(openTimes);

        document.getElementById("searchedRestos").appendChild(attList);


        var orderBtn = document.createElement("button");
        orderBtn.setAttribute("class","button");
        orderBtn.innerHTML = "Order Here";
        orderBtn.setAttribute("onclick", "navToMenuPage("+i+")");
        document.getElementById("searchedRestos").appendChild(orderBtn);
        
        if(i<allRestos.length-1){
            document.getElementById("searchedRestos").appendChild(document.createElement("hr"));
        }
    }
}

function getRestos(){
    var allRestos = [];
    allRestos.push(new Restaurant("Let's Taco-bout It",
                                  "mexres.jpg",
                                  "3.5/5",
                                  "114 Restaurant Road, Kanata, ON, K0L 5D9",
                                  "Mexican Restaurant",
                                  "$$$",
                                  "11:00 am - 11:00 pm",
                                  [new menuItem("Enchiladas", "notEnchiladas.jpg", 5, "We don't really know how to make mexican food but this looks kind of like it I think.")]  
                                  ));
    
    allRestos.push(new Restaurant("Banana Sam's Banana Shack",
                                  "banres.jpg",
                                  "4.6/5",
                                  "115 Restaurant Road, Kanata, ON, K0L 3B5",
                                  "Desert Restaurant",
                                  "$",
                                  "12:00 am - 11:59 pm",
                                  [new menuItem("Banana on a Stick", "bananaOnAStick.png", 5, "Half a banana with a stick in it."),
                                  new menuItem("Banana on a Stick Dipped in Chocolate", "bananaWithChocolate.png", 6, "Half a banana with a stick in it but now there's chocolate."),
                                  new menuItem("Banana on a Stick Dipped in Chocolate & Nuts", "bananaWithChocolateAndNuts.jpg", 7, "Half a banana with a stick in it but now there's chocolate and you die if you are allergic to nuts.")]
                                  ));
    
    allRestos.push(new Restaurant("Canigeta Breakfast",
                                  "breres.jpg",
                                  "5/5",
                                  "116 Restaurant Road, Kanata, ON, K0L 4H7",
                                  "Breakfast Restaurant",
                                  "$$",
                                  "8:00 am - 1:00 pm",
                                  [new menuItem("Single Egg", "singleEgg.jpg", 5, "The humble man's Gusher.")]
                                  ));
    return allRestos;
}

function populateMenu(){
    var index = JSON.parse(localStorage.getItem("allRestosIndex"));
    var allRestos = JSON.parse(localStorage.getItem("allRestos"));
    var title = document.createElement("h1");
    title.innerHTML = allRestos[index].title;
    document.getElementById("restoIdentity").appendChild(title);

    var image = document.createElement("img");
    image.setAttribute("src", allRestos[index].logo);
    document.getElementById("restoIdentity").appendChild(image);

    var i = 0;
    for(const menuItem of allRestos[index].menuItemsArray){
        var itemName = document.createElement("h3");
        itemName.innerHTML = menuItem.name
        document.getElementById("menu").appendChild(itemName);

        var foodImage = document.createElement("img");
        foodImage.setAttribute("src",menuItem.image);
        foodImage.setAttribute("width","200px");
        document.getElementById("menu").appendChild(foodImage);

        var itemAtts = document.createElement("p");
        itemAtts.innerHTML = "Price:        "+menuItem.price+"$ <br> Description:   "+menuItem.description;
        document.getElementById("menu").appendChild(itemAtts);

        var addToCart = document.createElement("button");
        addToCart.setAttribute("onclick", "addToCart("+i+")");
        addToCart.setAttribute("class", "button");
        addToCart.innerHTML = "Add to Cart";

        document.getElementById("menu").appendChild(addToCart);

        document.getElementById("menu").appendChild(document.createElement("hr"));
        i++;
    }

}

function addToCart(menuItemIndex){
    var restos = JSON.parse(localStorage.getItem("allRestos"));
    var restoIndex = JSON.parse(localStorage.getItem("allRestosIndex"));

    if(localStorage.getItem("cart")==null){
        var cartAr = [];

        for(const resto of restos){
            for(const food of resto.menuItemsArray){
                cartAr.push(food);
            }
        }
        
        localStorage.setItem("cart", JSON.stringify(cartAr));
    }

    var cartAr = JSON.parse(localStorage.getItem("cart"));


    for(menuItem of cartAr){
        if (menuItem.name==restos[restoIndex].menuItemsArray[menuItemIndex].name){
            menuItem.quantity++;
        }
    }

    localStorage.setItem("cart", JSON.stringify(cartAr));
}

function populateOrder(){
    var cartAr = JSON.parse(localStorage.getItem("cart"));

    var total=0;
    var i =0;
    for(const menuItem of cartAr){
        if(menuItem.quantity>0){
            var orderedItem = document.createElement("li");
            orderedItem.setAttribute("id", "item#"+i);

            var itemName = document.createElement("h4");
            itemName.innerHTML = menuItem.name;
            orderedItem.appendChild(itemName)


            var itemDescList = document.createElement("ul");

            var itemQuantity = document.createElement("li");
            itemQuantity.innerHTML = "Quantity: "+menuItem.quantity;
            itemDescList.appendChild(itemQuantity)

            var itemTotalCost = document.createElement("li");
            itemTotalCost.innerHTML = "Cost of Items: $"+(menuItem.price*menuItem.quantity);
            itemDescList.appendChild(itemTotalCost);

            total+=menuItem.price*menuItem.quantity;

            orderedItem.appendChild(itemDescList);


            var removeOne = document.createElement("button");
            removeOne.innerHTML = "Remove One";
            removeOne.setAttribute("onclick", "removeFromCart("+i+")");
            removeOne.setAttribute("class", "button button3");


            document.getElementById("menuItemsToOrder").appendChild(orderedItem);
            document.getElementById("menuItemsToOrder").appendChild(removeOne);

            
        }
        i++;
    }

    document.getElementById("total").innerHTML = "Total Cost = $"+total;

}

function removeFromCart(cartIndex){
    var cartAr = JSON.parse(localStorage.getItem("cart"));
    if(cartAr[cartIndex].quantity>0){
        cartAr[cartIndex].quantity--;
    }
    localStorage.setItem("cart", JSON.stringify(cartAr));
    location.reload();

    
}

function checkFields(){
    if (document.getElementById("name").value == ""){
        alert("Enter your name.")
    }

    if (document.getElementById("address").value == ""){
        alert("Enter your address.")
    }

    var pCode1 = /[A-Za-z][0-9][A-Za-z][0-9][A-Za-z][0-9]/;
    var pCode2 = /[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]/;
    if (!pCode1.test(document.getElementById("pcode").value)&&!pCode2.test(document.getElementById("pcode").value)){
        alert("Invalid Postal Code");
    }

}

function populateOrderInfoCheckout(){
    var cartAr = JSON.parse(localStorage.getItem("cart"));
    var total = 0;
    for (const menuItem of cartAr){
        if(menuItem.quantity>0){
            var item = document.createElement("li");
            item.innerHTML = menuItem.name+" x "+menuItem.quantity;
            document.getElementById("orderDetails").appendChild(item);

            total+=menuItem.quantity*menuItem.price;
        }
    }
    var tempLi1 = document.createElement("li");
    var tempLi2 = document.createElement("li");

    var totalHeader = document.createElement("h4");
    totalHeader.innerHTML = "Total = $"+total;
    tempLi1.appendChild(totalHeader);

    var totalHST = (Math.round(total*13)/100);
    var hstHeader = document.createElement("h4");
    hstHeader.innerHTML = "HST = $"+totalHST;
    tempLi2.appendChild(hstHeader);

    document.getElementById("orderDetails").appendChild(tempLi1);
    document.getElementById("orderDetails").appendChild(tempLi2);

    document.getElementById("grandTotal").innerHTML = "Grand Total = $"+(totalHST+total);
    
    hstHeader.innerHTML = 
    document.getElementById("orderDetails").appendChild();
}