let dialogRef;

/**
 * Open the Dialog
 */
function openDialog(type) {
  dialogRef = document.getElementById(`dialog${type}`);
  dialogRef.classList.add("d-flex");
  dialogRef.showModal();
}

/**
 * Close the Dialog
 * @param {object} event - Click event
 */
function closeDialog(event) {
  if (event.target === dialogRef) {
    dialogRef.classList.remove("d-flex");
    dialogRef.close();
  }
}
