// --- Récupérer l'id de l'ourson --- //

function getId(){
    const param = window.location.search;
    const id = param.replace("?id=", ""); 
    return id;
}

// --- Création du fichier HTML sans lequel tout es affiché --- // 

function addProductInfo(response){
    
    // --- Crée un cadre pour inclure les infos --- // 
    const container = document.getElementById("cadreproduit");
    
    const div = document.createElement("div");
    div.setAttribute("class", "product-border offset-1 col-10 col-md-6 offset-md-3 mt-5 mb-5 p-3 border border-dark");
    div.style.textAlign = "center";
    div.style.backgroundColor = "grey";
    div.style.paddingBottom = "5%";
    div.style.paddingTop = "2%"

    // --- Rajoute l'image de l'item --- // 
    const img = document.createElement("img");
    img.setAttribute("src", response.imageUrl);
    img.setAttribute("width", "100%");
    img.style.paddingBottom = "5%";
    img.style.paddingTop = "3%"

    // --- Rajoute une div pour le nom de l'item --- // 
    const title = document.createElement("div");
    title.innerHTML = response.name;
    title.setAttribute("class", "producttitle text-center mb-4");

    // --- Rajoute une div pour la description de l'item --- //
    const description = document.createElement("div");
    description.innerHTML = response.description;
    
    // --- Rajoute une div pour le prix de l'item --- //
    const price = document.createElement("p");
    price.innerHTML = response.price + "€";
    price.style.fontSize = "x-large";
    price.style.color = "orange";

    // --- Rajoute un sélecteur pour les couleurs --- //
    const colors = document.createElement("select");
    // --- Ajouter les options en fonction des couleurs dispo --- // 
    const optionDefault = document.createElement("option");
    optionDefault.innerHTML = "Please choose a color";
    colors.appendChild(optionDefault);
    

    // --- Rajoute chaque couleurs dispo pour chaque ourson --- //
    for (let i = 0; i < response.colors.length; i = i + 1){
        const option = document.createElement("option");
        option.setAttribute("value", response.colors[i]);
        option.innerHTML = response.colors[i];
        colors.appendChild(option);
    }


    // --- Bouton ajouter au panier --- //
    const btn = document.createElement("button");
    console.log(btn);
    btn.innerHTML = "Add to basket";


    // --- crée une div dans la balise container --- // 
    container.appendChild(div);

    // --- ajoute une div pour le titre de l'item --- // 
    div.appendChild(title);

    // --- ajoute une div pour l'image' de l'item --- //
    div.appendChild(img);

    // --- ajoute une div pour la description de l'item --- //
    div.appendChild(description);

    // --- ajoute une div pour le prix de l'item --- //
    div.appendChild(price);

    // --- ajoute une div pour la couleur de l'item --- //
    div.appendChild(colors);

}

// --- Permet de récupérer l'id des différents item et de nous les renvoyer --- //
const id = getId();
get("http://localhost:3000/api/teddies/" + id).then( function(response){
    addProductInfo(response);
});