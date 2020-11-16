////////////// Récuprérer l'id dans l'URL /////////////////////////////////////////////////
function getId(){
    const param = window.location.search;
    const id = param.replace("?id=", ""); // Retire ?ID= des parametres de l'URL, Recupère uniquement l'identitfiant
    return id;
}

///////////////////////// Ajoute les informations produit dans la page HTLM ///////////////////
function addProductInfo(response){
    //création du cadre de l'appareil photo séléctionné
    const container = document.getElementById("productcontainer");

    const div = document.createElement("div");
    div.setAttribute("class", "product-border offset-1 col-10 col-md-6 offset-md-3 mt-5 mb-5 p-3 border border-dark");

    const img = document.createElement("img");
    img.setAttribute("src", response.imageUrl);
    img.setAttribute("width", "100%");

    const title = document.createElement("div");
    title.innerHTML = response.name;
    title.setAttribute("class", "producttitle text-center mb-4");

    const legend = document.createElement("div");
    legend.innerHTML = response.description;
    
    const price = document.createElement("p");
    price.innerHTML = response.price + "€";
    

    // arboresence
    container.appendChild(div);
    div.appendChild(title);
    div.appendChild(img);
    div.appendChild(description);
    div.appendChild(colors);
    div.appendChild(price);
}
const id = getId();
get("http://localhost:3000/api/teddies/" + id).then( function(response){
    addProductInfo(response);
    
}).catch(function(err){
    console.log(err);
    if(err === 0){ // requete ajax annulée
        alert("serveur HS");
    }
});