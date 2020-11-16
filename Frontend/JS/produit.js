const idTeddy = document.location.hash.substring();

const afficherUnTeddy = async idTeddy => {
   const element = get(`http://localhost:3000/api/teddies`);
   const article = document.querySelector('#article');


   article.innerHTML =`
            <div class="col-sm-10 col-md-8 col-lg-6 mx-auto">
               <div class="card h-100">
                  <img class="card-img-top" src="${element.imageUrl}" alt="">
                  <div class="card-body">
                  <p>${element.id}</p>
                     <h4 class="card-title text-primary">${element.name}</h4>
                     <h5>${element.price}</h5>
                     <p class="card-text">${element.description}</p>
                  </div>
               </div>
            </div>`;
};


afficherUnTeddy(idTeddy)
   .then( article => {
      const btnAjoutPanier = article.querySelector('#ajoutPanier');
      btnAjoutPanier.addEventListener('click', () => {
         const quantite = article.querySelector('#quantite').value;
         
         if (parseInt(quantite) > 0 && Number.isInteger(parseFloat(quantite))) {
            ajoutTeddyLocalStorage(idTeddy, quantite);
         } else {
            btnAjoutPanier.removeAttribute('data-toggle');
            btnAjoutPanier.removeAttribute('data-target');
            alert("Il faut saisir un entier supérieur à 0");
            location.reload();
         }

      })
   });

   