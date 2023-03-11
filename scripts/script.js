let popup = document.querySelector('.popup');
let popupContainer = popup.querySelector('.popup__container');
let popupEditForm = popupContainer.querySelector('.popup__edit-form');

const editBtn = document.querySelector('.profile__edit-btn');
const closeBtn = document.querySelector('.popup__close-btn');
const saveBtn = document.querySelector('.popup__save-btn');

let inputName = popupEditForm.querySelector('.popup__input_type_name');
let inputJob = popupEditForm.querySelector('.popup__input_type_job');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

const openPopup = function () {
  popup.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
};

const closePopup = function () {
  popup.classList.remove('popup_opened');
};

const closePopupByClickOverlay = function (e) {
  if (e.target === e.currentTarget) {
    closePopup();
  }
};

editBtn.addEventListener('click', openPopup);
closeBtn.addEventListener('click', closePopup);
popup.addEventListener('click', closePopupByClickOverlay);

function handleFormSubmit(e) {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
}

popupEditForm.addEventListener('submit', handleFormSubmit);
saveBtn.addEventListener('click', closePopup);
