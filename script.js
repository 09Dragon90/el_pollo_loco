let dialogRef = document.getElementById("dialog");

/**
 * Open the Dialog
 */
function openDialog() {
  dialogRef.showModal();
}

/**
 * Close the Dialog
 * @param {object} event - Click event
 */
function closeDialog(event) {
  if (event.target === dialogRef) {
    dialogRef.close();
  }
}

// TODO
// Impressum muss mit einem klick erreichbar sein
// Mute in Local Storage speichern
// Schaden am Pepe vergrößern
// Nach Jump ist pepe nicht auf gleicher höhe
// Nach Lose keine Buttons für replay
// Buttens Steuerung bei Ipad schon einplenden
// Buttons Kontext menue unterdrücken
// Hitbox chickens kleiner machen
