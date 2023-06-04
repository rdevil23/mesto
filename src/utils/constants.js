export const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66/',
  headers: {
    authorization: 'aa38c948-6d23-4336-8d1a-1b31ad529250',
    'Content-Type': 'application/json',
  },
};

export const addPopup = document.querySelector('.add-popup');
export const popupEditForm = document.querySelector('.popup__edit-form');
export const addForm = addPopup.querySelector('.add-form');
export const avatarForm = document.querySelector('.avatar-form');

export const editBtn = document.querySelector('.profile__edit-btn');
export const addBtn = document.querySelector('.profile__add-btn');
export const editAvatarBtn = document.querySelector('.profile__avatar-edit-btn');

export const inputName = popupEditForm.querySelector('.popup__input_type_name');
export const inputJob = popupEditForm.querySelector('.popup__input_type_job');

export const nameSelector = document.querySelector('.profile__name');
export const aboutSelector = document.querySelector('.profile__job');
export const avatarSelector = document.querySelector('.profile__avatar');

export const elementsList = '.elements__list';

export const validationConfig = {
  formSelector: '.popup__edit-form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};
