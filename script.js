let dialogRef = document.getElementById("dialog");

function openDialog() {
  dialogRef.showModal();
}

function closeDialog(event) {
  if (event.target === dialogRef) {
    // let bodyRef = document.getElementById("body");
    // bodyRef.classList.remove("modal-open");
    dialogRef.close();
  }
}
