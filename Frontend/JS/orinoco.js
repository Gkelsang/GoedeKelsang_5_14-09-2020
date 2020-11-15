// récupérer toutes infos de l'API

  fetch('http://localhost:3000/api/teddies')

// récupérer sous forme de données .json

  .then(response => response.json())
  .then(json =>  {
    console.log(json)

// Afficher le tout dans une card

    json.forEach(element => {
      console.log(element);
      document.getElementById('item').innerHTML += `
      <div class="card col-4 col-md-4 col-lg-2">

      <p class="card-id">ID:${element._id}</p><br>
      <p class="card-name">${element.name}</p>
      <p class="card-text">${element.price} €</p>
      <p><img class="card-img-top" src="${element.imageUrl}"></p> 
      <p class="card-description">${element.description}</p>

      </div> `
    });
  });
  


  