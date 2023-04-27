import Card from './card.js';
import FormValidator from './formValidator.js';
import { cards } from './elements.js';

const popup = document.querySelector('.popup');
const popups = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('.profile-popup');
const addPopup = document.querySelector('.add-popup');
const popupEditForm = document.querySelector('.popup__edit-form');
const addForm = addPopup.querySelector('.add-form');
const popupImgContainer = document.querySelector('.popup_type_open-img');
const popupImage = popupImgContainer.querySelector('.popup__img');
const popupTitle = popupImgContainer.querySelector('.popup__img-title');

const editBtn = document.querySelector('.profile__edit-btn');
const addBtn = document.querySelector('.profile__add-btn');

const inputName = popupEditForm.querySelector('.popup__input_type_name');
const inputJob = popupEditForm.querySelector('.popup__input_type_job');

const inputTitle = addForm.querySelector('.popup__input_type_title');
const inputLink = addForm.querySelector('.popup__input_type_link');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const elementsList = document.querySelector('.elements__list');

const validationConfig = {
  formSelector: '.popup__edit-form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

const profileValidation = new FormValidator(validationConfig, popupEditForm);
const addCardValidation = new FormValidator(validationConfig, addForm);
profileValidation.enableValidation();
addCardValidation.enableValidation();

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

function closePopupEsc(e) {
  if (e.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close-btn')) {
      closePopup(popup);
    }
  });
});

// открытие попапа картинки
function showPopupImgCard(data) {
  popupTitle.textContent = data.name;
  popupImage.src = data.link;
  popupImage.alt = 'Картинка ' + data.name;
  openPopup(popupImgContainer);
}

// отрисовка готовых карточек
cards.forEach((data) => {
  elementsList.append(createCard(data));
});

// создание экземпляра новой карточки
function createCard(data) {
  const card = new Card(data, '#elements-template', showPopupImgCard);
  const cardElementNew = card.generateCard();
  return cardElementNew;
}

// открытие попапа для создания новой карточки
function openAddCardPopup(e) {
  addCardValidation.removeInputErrors();
  e.preventDefault();
  openPopup(addPopup);
}

// добавление новой карточки
function handleAddCard(e) {
  e.preventDefault();
  const newCard = { name: inputTitle.value, link: inputLink.value };
  elementsList.prepend(createCard(newCard));
  closePopup(addPopup);
  addForm.reset();
}

// обновление данных профиля
function handleFormSubmit(e) {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(profilePopup);
}

// подгрузка текущих данных профиля в инпуты
editBtn.addEventListener('click', () => {
  profileValidation.removeInputErrors();
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openPopup(popup);
});

// слушатель на открытие попапа добавления карточки
addBtn.addEventListener('click', openAddCardPopup);
// слушатель на добавление новой карточки
addForm.addEventListener('submit', handleAddCard);
// слушатель на сохранение новых данных профиля
popupEditForm.addEventListener('submit', handleFormSubmit);
