// --- les infos qui doivent être créer en HTML pour chaques infos récupérés du serveur --- // 


// --- crée une section avec une div à l'interieur qui va contenir les informations avec les attributs suivant --- // 

function addProduct(responseProduct, section){
  const div = document.createElement("div");
  // --- Ajout d'une classe pour css --- //
  div.classList.add('divProd');
  div.innerHTML = responseProduct.name;

  // --- crée une div avec une image --- // 

  const img = document.createElement("img");
  // --- Ajout d'une classe pour css --- //
  img.classList.add('imgProd');
  img.setAttribute("src", responseProduct.imageUrl);

  const description = document.createElement("div");
  // --- Ajout d'une classe pour css --- //
  description.classList.add('descriptionProd');
  description.innerHTML = responseProduct.description;

  const colors = document.createElement("p");
  // --- Ajout d'une classe pour css --- //
  colors.classList.add('colorsProd')
  colors.innerHTML = "Choix des couleurs: "+ responseProduct.colors;
  
  const price = document.createElement("p");
  // --- Ajout d'une classe pour css --- //
  price.classList.add('priceProd')
  price.innerHTML = responseProduct.price + " €";

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