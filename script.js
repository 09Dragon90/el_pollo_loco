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
