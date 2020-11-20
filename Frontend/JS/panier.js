
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

    // -------- Met le panier à jour -------- //     
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

const formValid = document.getElementById('submitbtn');

const nom = document.getElementById('nom');
const missNom = document.getElementById('missNom');
const nomValid = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;

const prenom = document.getElementById('prenom');
const missPrenom = document.getElementById('missPrenom');
const prenomValid = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;

const email = document.getElementById('email');
const missEmail = document.getElementById('missEmail');
const emailValid = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const adresse = document.getElementById('adresse');
const missAdresse = document.getElementById('missAdresse');
const adresseValid = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;

const ville = document.getElementById('ville');
const missVille = document.getElementById('missVille');
const villeValid = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;

formValid.addEventListener('click', validation);

// --------------------- Messages d'erreurs --------------------- //

formValid.onChange

function validation(event){
    // --------------------- Messages d'erreurs --------------------- //
    // --------------------- nom --------------------- //
    if (nom.validity.valueMissing){
        event.preventDefault();
        missNom.textContent = 'Nom manquant !';
        missNom.style.color = 'red';
        missNom.style.paddingLeft = '5%';
    }else if (nomValid.test(nom.value) == false){
        event.preventDefault();
        missNom.textContent = 'Format Incorrect';
        missNom.style.color = 'orange'
        missNom.style.paddingLeft = '5%';
    }
    // --------------------- Messages d'erreurs --------------------- //
    // --------------------- prénom --------------------- //
    if (prenom.validity.valueMissing){
        event.preventDefault();
        missPrenom.textContent = 'Prenom manquant !';
        missPrenom.style.color = 'red';
        missPrenom.style.paddingLeft = '5%';
    }else if (prenomValid.test(prenom.value) == false){
        event.preventDefault();
        missPrenom.textContent = 'Format Incorrect';
        missPrenom.style.color = 'orange'
        missPrenom.style.paddingLeft = '5%';
    }
    // --------------------- Messages d'erreurs --------------------- //
    // --------------------- email --------------------- //
    if (email.validity.valueMissing){
        event.preventDefault();
        missEmail.textContent = 'Email manquante !';
        missEmail.style.color = 'red';
        missEmail.style.paddingLeft = '5%';
    }else if (emailValid.test(email.value) == false){
        event.preventDefault();
        missEmail.textContent = 'Format Incorrect';
        missEmail.style.color = 'orange'
        missEmail.style.paddingLeft = '5%';
    }
    // --------------------- Messages d'erreurs --------------------- //
    // --------------------- adresse --------------------- //
    if (adresse.validity.valueMissing){
        event.preventDefault();
        missAdresse.textContent = 'Adresse manquante !';
        missAdresse.style.color = 'red';
        missAdresse.style.paddingLeft = '5%';
    }else if (adresseValid.test(Adresse.value) == false){
        event.preventDefault();
        missAdresse.textContent = 'Format Incorrect';
        missAdresse.style.color = 'orange'
        missAdresse.style.paddingLeft = '5%';
    }
    // --------------------- Messages d'erreurs --------------------- //
    // --------------------- ville --------------------- //
    if (ville.validity.valueMissing){
        event.preventDefault();
        missVille.textContent = 'Ville manquante !';
        missVille.style.color = 'red';
        missVille.style.paddingLeft = '5%';
    }else if (villeValid.test(ville.value) == false){
        event.preventDefault();
        missVille.textContent = 'Format Incorrect';
        missVille.style.color = 'orange'
        missVille.style.paddingLeft = '5%';
    }
}


// --------------------- FIN Conditions du formulaire --------------------- //


// ------------------------------------------------- ENVOYER REQUETE ------------------------------------------------- //

class infoForm {
    constructor(nom, prenom, email, adresse, ville) {
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.addresse = adresse;
        this.ville = ville;
    }
}

//information commande
class infoCommande {
    constructor(infoFormulaire, idOrder) {
        this.contact = infoFormulaire;
        this.products = idOrder;
    }
}


function envoyerRequete(){
    const nom = document.getElementById("nom").value;
    const prenom = document.getElementById("prenom").value;
    const email = document.getElementById("email").value;
    const adresse = document.getElementById("adresse").value;
    const ville = document.getElementById("ville").value;

    const infoFormulaire = new infoform (nom, prenom, email, adresse, ville);
    const basketContent = JSON.parse(localStorage.getItem("basketContent"));

    let idOrder = [];
    console.log(idOrder);

    for (let i = 0; i < basketContent.length; i = i + 1){
        basketContent[i].id;
        idOrder.push(basketContent[i].id);
    }
    const commande = new infoCommande(infoFormulaire, idOrder);
    post("http://localhost:3000/api/teddies/order", commande).then( function(response){
        localStorage.setItem("basketContent", JSON.stringify([]));
        localStorage.setItem("confirmationCommande", response.orderId);
        window.location.href = "commande.html";
        console.log(commande);

    })
}



// ------------------------------------------------- FIN ENVOYER REQUETE ------------------------------------------------- //





get("http://localhost:3000/api/teddies/").then(function(response){
    
    // --- Ajouter un élement au panier --- // 
        // --- Récupération du localStorage --- //
    const basketContent = JSON.parse(localStorage.getItem("basketContent"));
    const container = document.getElementById("product-basket");
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




