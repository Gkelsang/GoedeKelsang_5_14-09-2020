// --- les infos qui doivent être créer en HTML pour chaques infos récupérés du serveur --- // 


// --- crée une section avec une div à l'interieur qui va contenir les informations avec les attributs suivant --- // 

function addProduct(responseProduct, section){
  const div = document.createElement("div");
  div.innerHTML = responseProduct.name;
  div.setAttribute("class", "col-md-5 product-border mt-5 mb-4 col-sm-6 mr-4 ml-4 border border-dark");
  div.style.textAlign = "center";
  div.style.backgroundColor = "grey";
  div.style.paddingBottom = "5%";
  div.style.paddingTop = "2%"

  // --- crée une div avec une image --- // 
  const img = document.createElement("img");
  img.setAttribute("src", responseProduct.imageUrl);
  img.setAttribute("width", "100%");
  img.style.paddingBottom = "5%";
  img.style.paddingTop = "3%"

  // --- Rajoute une div pour la description de l'item --- //  
  const description = document.createElement("div");
  description.innerHTML = responseProduct.description;

  // --- Rajoute un sélecteur pour les couleurs --- /
  const colors = document.createElement("p");
  colors.innerHTML = "Choix des couleurs: "+ responseProduct.colors;
  
  // --- Rajoute une div pour le prix de l'item --- //
  const price = document.createElement("p");
  price.classList.add('priceProd');
  price.innerHTML = responseProduct.price + " €";
  price.style.fontSize = "x-large";
  price.style.color = "orange";
  
  // --- Rajoute le lien pour la page produit --- /
  const link = document.createElement("a");
  link.setAttribute("href", "produit.html?id=" + responseProduct._id);


  // --- crée une div dans la balise section --- // 
  section[1].appendChild(div);

  // --- ajoute un lien dans la balise div --- // 
  div.appendChild(link);

  // --- ajoute une image dans la balise link --- // 
  link.appendChild(img);

  // --- ajoute une div description dans la balise section --- // 
  div.appendChild(description);

  // --- ajoute le choix des couleurs dans la une balise div --- // 
  div.appendChild(colors);

  // --- ajoute le prix dans une balise divv --- // 
  div.appendChild(price);
}

// --- création d'une balise section pour intégrer les items --- // 

function correction(section){
  const div = document.createElement("div");
  div.setAttribute("class", "col-md-5 mt-5 mb-4 ml-4 mr-4");
  section[1].appendChild(div);
}


get("http://localhost:3000/api/teddies").then( function(response){
  const section = document.getElementsByClassName("item");
  
  // --- Création de la card --- // 

  for (let i = 0; i < response.length; i = i + 1){   
      addProduct(response[i], section);
  }
});