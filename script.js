function navToWelcomePage() {
    window.location.href = "WelcomePage.html";
}

function navToCheckoutPage() {
    window.location.href = "CheckoutPage.html";
}

function navToListofRestaurants() {
    window.location.href = "ListofRestaurants.html";
}

function navToMenuPage(menuPage) {
    window.location.href = menuPage;
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
    }
}

function populateRestos(){
    var allRestos = getRestos();
    var i;
    var restosContent;
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
        orderBtn.innerHTML = "Order Here";
        document.getElementById("searchedRestos").appendChild(orderBtn);
        
        
    }
}

function getRestos(){
    var allRestos = [];
    allRestos.push(new Restaurant("Let's Taco-bout It",
                                  "banres.jpg",
                                  "3.5/5",
                                  "114 Restaurant Road, Kanata, ON, K0L 5D9",
                                  "Mexican Restaurant",
                                  "$$$",
                                  "11:00 am - 11:00 pm",
                                  [new menuItem("Banana on a Stick", "bananaOnAStick.png", 5, "Half a banana with a stick in it."),
                                   new menuItem("Banana on a Stick Dipped in Chocolate", "bananaOnAStickWithChocolate.png", 6, "Half a banana with a stick in it but now there's chocolate."),
                                   new menuItem("Banana on a Stick Dipped in Chocolate & Nuts", "bananaOnAStickWithChocolateAndNuts.jpg", 7, "Half a banana with a stick in it but now there's chocolate and you die if you are allergic to nuts.")
                                  ]
                                  ))
    return allRestos;
}

function populateMenu(){

}