
// --- Création du HTML à partir du panier --- //

const container = document.getElementById("product-basket");

function addBasketProduct(container, productInfo, productBasket, basketContent, totalPrice){
    const productContainer = document.createElement("div");
    productContainer.setAttribute("class", "row justify-content-around mb-5");
    
    const divTitle = document.createElement("div");
    divTitle.setAttribute("class", "col-md-3");

//  // ----------------------------------------------- DEBUT DU TABLEAU ----------------------------------------------- //  //
 // ----------------------------------------------- COLONNE 1 DU TABLEAU ----------------------------------------------- //

    const name = document.createElement("p");
    name.innerHTML = productInfo.name;
    name.style.color ="orange";
    
    const image = document.createElement("img");
    image.innerHTML = productInfo.imageUrl;
    image.setAttribute("src", productInfo.imageUrl);
    image.setAttribute("width", "70%");   
    image.style.border ="solid 2px orange";
    

    // --- Bouton pour supprimer le produit --- //

    const btn = document.createElement("button"); 
    btn.innerHTML = "Supprimer";
    btn.setAttribute("class", "bg-light text-dark");
    btn.setAttribute("data-id", productInfo._id);
    btn.style.borderRadius = "8px";
    btn.style.marginTop = "3%";

 // ----------------------------------------------- COLONNE 2 DU TABLEAU ----------------------------------------------- //


    const divColors = document.createElement("div");
    divColors.setAttribute("class", "col-md-3");
    divColors.innerHTML = productBasket.color;
    divColors.style.color = "white";
    
    
 // ----------------------------------------------- COLONNE 3 DU TABLEAU ----------------------------------------------- //


    const divPrice = document.createElement("div");
    divPrice.setAttribute("class", "col-md-3");
    divPrice.innerHTML = productInfo.price + "€";
    divPrice.style.color = "orange";
    totalPrice = totalPrice + productInfo.price;  
     
    

//  // ----------------------------------------------- FIN DU TABLEAU ----------------------------------------------- //  //


    // --------  Supprimer un élément du panier -------- //

    btn.addEventListener('click', function(e){ 
        const id = e.target.getAttribute("data-id");

        for (let x = 0; x != basketContent.length; x = x + 1){
            if (basketContent[x].id === id){
                basketContent.splice(x, 1);
                break;
            }
        }
 
        localStorage.setItem("basketContent", JSON.stringify(basketContent)); 
    // -------- Permet de revenir en haut de la page une fois qu'on a cliquer sur supprimé -------- // 
        window.location.href = "panier.html"; 
    });
    
    // --- Arborescence de la page --- //

    productContainer.appendChild(divTitle);
    divTitle.appendChild(name);
    divTitle.appendChild(image);
    divTitle.appendChild(btn); 
    productContainer.appendChild(divColors);
    productContainer.appendChild(divPrice);
    container.appendChild(productContainer);

    return totalPrice;
}




// ------------------------------------------------- FORMULAIRE + VALIDATION ------------------------------------------------- //

// --------------------- Conditions du formulaire --------------------- //

// --- Validation nom, prénom et ville --- // 

function isAlpha(value){
    return /[a-zA-Z]+/.test(value);
}

// --- Validation mail --- //

function validateEmail(value){
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)){
    return true;
  }
  return false;
}

// --- Validation adresse --- //

function isAdresse(value){
    return /\w+/.test(value);
}

// ------------------------------------------ Message d'erreurs formulaire ------------------------------------------ //

function checkFormErrors(orderValidity){
    const error = document.getElementById("error");
    error.innerHTML = "";
    let inputIds = ["lastName", "firstName", "email", "address", "city"];
    let inputTexts = ["Nom", "Prénom", "email", "adresse", "ville"];
    for (let i = 0; i < inputIds.length; i = i + 1){
        const input = document.getElementById(inputIds[i]);
        if (input.value === ""){
            const errorMessage = document.createElement("p");
            errorMessage.setAttribute("class", "text-danger");
            errorMessage.innerHTML = "Merci d'indiquer votre " + inputTexts[i] + ".";
            orderValidity = false;
            error.appendChild(errorMessage);
        }else{
            if (inputIds[i] === "lastName" || inputIds[i] === "firstName" || inputIds[i] === "city"){
                if (isAlpha(input.value) === false){
                    const errorMessage = document.createElement("p");
                    errorMessage.setAttribute("class", "text-warning");
                    errorMessage.innerHTML = "Merci d'écrire votre " + inputTexts[i] + " en toutes lettres.";
                    orderValidity = false;
                    error.appendChild(errorMessage);
                }
            }
            if (inputIds[i] === "email"){
                if (validateEmail(input.value) === false){
                    const errorMessage = document.createElement("p");
                    errorMessage.setAttribute("class", "text-warning");
                    errorMessage.innerHTML = "Merci d'écrire un " + inputTexts[i] + " valide";
                    orderValidity = false;
                    error.appendChild(errorMessage);
                }
            }
            if (inputIds[i] === "address"){
                if (isAdresse(input.value) === false){
                    const errorMessage = document.createElement("p");
                    errorMessage.setAttribute("class", "text-warning");
                    errorMessage.innerHTML = "Merci d'écrire une " + inputTexts[i] + " valide";
                    orderValidity = false;
                    error.appendChild(errorMessage);
                }
            }
        }
    }
    return orderValidity;
}

// ------------------------------------------ Envoye requete ------------------------------------------ //

function sendOrder(){
    const lastName = document.getElementById("lastName").value;
    const firstName = document.getElementById("firstName").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;  

    const formInformation = new infoForm (lastName, firstName, email, address, city);
    const basketContent = JSON.parse(localStorage.getItem("basketContent"));

    let idOrder = [];
    
    for (let i = 0; i < basketContent.length; i =  i + 1){
        basketContent[i].id;
        idOrder.push(basketContent[i].id);
    }
    const command = new orderInfo(formInformation, idOrder);
    post("http://localhost:3000/api/teddies/order", command).then( function(response){
        localStorage.setItem("basketContent", JSON.stringify([])); 
        localStorage.setItem("orderConfirmation", response.orderId);
        window.location.href = "commande.html"; 
    })
}
// ------------------------------------------ Panier vide ------------------------------------------ //

function emptyBasketMessage(container){
    const emptyBasket = document.createElement("div")
    emptyBasket.innerHTML = "Votre panier est vide";
    emptyBasket.style.color = "orange";
    emptyBasket.style.textTransform = "uppercase";
    emptyBasket.style.fontSize = "2em";
    container.appendChild(emptyBasket);
    return container;
}



// ------------------------------------------------- FIN ENVOYER REQUETE ------------------------------------------------- //



get("http://localhost:3000/api/teddies/").then(function(response){
    
    // --- Ajouter un élement au panier --- // 
        // --- Récupération du localStorage --- //
    const basketContent = JSON.parse(localStorage.getItem("basketContent"));
    
    if (basketContent.length === 0){

        // --- Si panier vide écrire une message --- //
        emptyBasketMessage(container);
    } else {
        let totalPrice = 0;
        for (let productBasket of basketContent){
            for (let productInfo of response){
                if (productBasket.id === productInfo._id){
                    totalPrice = addBasketProduct(container, productInfo, productBasket, basketContent, totalPrice);
                    localStorage.setItem("totalPriceConfirmationPage", totalPrice);
                }
            }
        }
        // --- Calculer le total du prix --- //
        const totalPriceBasket = document.getElementById("total-price");
        totalPriceBasket.innerHTML = "Total : "+ totalPrice + " €";
    }
})
const btn = document.getElementById("submitbtn");

btn.addEventListener("click", function(event){
    event.preventDefault();
    let orderValidity = true;
    orderValidity = checkFormErrors(orderValidity);

    if (orderValidity === true){
        sendOrder();
    }
});



