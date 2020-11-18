// --- Création du HTML à partir du panier --- //

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
    btn.style.borderRadius = "15px";
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


    ///////////////////////////// Supprimer un élément du panier ///////////////////////////////////////
    btn.addEventListener('click', function(e){ 
        const id = e.target.getAttribute("data-id");

        for (let x = 0; x != basketContent.length; x = x + 1){
            if (basketContent[x].id === id){
                basketContent.splice(x, 1);
                break;
            }
        }
        localStorage.setItem("basketContent", JSON.stringify(basketContent)); // Sauvegarde du panier mis à jour
        window.location.href = "panier.html"; // on revient à la page d'acceuil 
    });
    
    productContainer.appendChild(divTitle);
    divTitle.appendChild(name);
    divTitle.appendChild(image);
    divTitle.appendChild(btn); 
    productContainer.appendChild(divColors);
    productContainer.appendChild(divPrice);
    container.appendChild(productContainer);

    return totalPrice;
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

get("http://localhost:3000/api/teddies/").then(function(response){
    //ajouter un élément au panier
    const basketContent = JSON.parse(localStorage.getItem("basketContent"));//récuperation local storage
    const container = document.getElementById("product-basket");
    if (basketContent.length === 0){ //Message panier vide
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
        // calcul du total
        const totalPriceBasket = document.getElementById("total-price")
        totalPriceBasket.innerHTML = "Total : " + totalPrice + " €";
    }
}).catch(function(err){
    console.log(err);
    if(err === 0){ // requete ajax annulée
        alert("serveur HS");
    }
});