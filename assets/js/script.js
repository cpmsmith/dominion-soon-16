var getNotified = document.getElementById('get-notified'),
    modalWrap   = document.getElementById('modal-wrapper'),
    closeButton = document.getElementById('modal-close');

function getNotifiedPopup(e) {
  var modalWrap = document.getElementById('modal-wrapper'),
      modal     = document.getElementById('modal-box');

  modalWrap.style.display = "block"
  modalWrap.style.opacity = "0.5";
  modal.style.display = "block"
  modal.style.opacity = "1";
}

function closePopup(e) {
  var modalWrap = document.getElementById('modal-wrapper'),
      modal     = document.getElementById('modal-box');

  modalWrap.style.display = "none";
  modalWrap.style.opacity = "0";
  modal.style.display = "none";
  modal.style.opacity = "0";
}

getNotified.onclick = getNotifiedPopup;
modalWrap.onclick = closePopup;
closeButton.onclick = closePopup;
