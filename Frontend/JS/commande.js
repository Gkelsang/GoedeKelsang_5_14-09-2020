function addConfirmationText(){
    const confirmationId = localStorage.getItem("confirmationCommande"); // récuperation de l'ID dans le local storage
    const totalPrice = localStorage.getItem("totalPriceConfirmationPage"); //récuperation du prix dans le local storage
    const confirmation = document.getElementById("confirmation");
    const messageConfirmation = document.createElement("p");
    const confirmationPrice = document.createElement("p");
    messageConfirmation.innerHTML = "votre commande n° "+ confirmationId;
    confirmationPrice.innerHTML = "Prix total: "+ totalPrice + "€";
    messageConfirmation.setAttribute("class", "confirmation-title pt-5")
    confirmation.appendChild(messageConfirmation);
    confirmation.appendChild(confirmationPrice);
}

addConfirmationText();