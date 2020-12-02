function addConfirmationText(){

    // --- récupere le numéro de la commande dans le local storage --- //
    const confirmationId = localStorage.getItem("orderConfirmation");
    // --- récupere la balise dans laquelle afficher le numéro de commande --- //
    const confirmation = document.getElementById("confirmation");
    // --- Crée un <p> en html avec le numéro de commande --- //
    const messageConfirmation = document.createElement("p");
    messageConfirmation.innerHTML = confirmationId;
    messageConfirmation.setAttribute("class", "confirmation-title pt-3")
    confirmation.appendChild(messageConfirmation);



    // --- récupere le total du prix dans le local storage --- //
    const totalPrice = localStorage.getItem("totalPriceConfirmationPage");
    // --- récupere la balise dans laquelle afficher le numéro de commande --- //
    const prix = document.getElementById("prix");
    // --- Crée un <p> en html avec le numéro de commande --- //
    const confirmationPrice = document.createElement("p");
    confirmationPrice.innerHTML = totalPrice + "€";
    confirmationPrice.setAttribute("class", "confirmation-title pt-3")
    prix.appendChild(confirmationPrice);

}

addConfirmationText();