const popup = document.querySelector('.popup');
const addPopup = document.querySelector('.add-popup');
const popupContainer = popup.querySelector('.popup__container');
const popupEditForm = popupContainer.querySelector('.popup__edit-form');
const addForm = addPopup.querySelector('.add-form');
const popupImgContainer = document.querySelector('.popup_type_open-img');
const popupImage = popupImgContainer.querySelector('.popup__img');
const popupTitle = popupImgContainer.querySelector('.popup__img-title');
const popupClose = popupImgContainer.querySelector('.popup__close-btn_type_img');
const cardImg = document.querySelector('.elements__img');

const editBtn = document.querySelector('.profile__edit-btn');
const closeBtn = document.querySelector('.popup__close-btn');
const closeAddPopupBtn = document.querySelector('.close-add-popup');
const addBtn = document.querySelector('.profile__add-btn');
const createBtn = document.querySelector('.create-btn');
const likeBtn = document.querySelector('.elements__like');

const inputName = popupEditForm.querySelector('.popup__input_type_name');
const inputJob = popupEditForm.querySelector('.popup__input_type_job');

const inputTitle = addForm.querySelector('.popup__input_type_title');
const inputLink = addForm.querySelector('.popup__input_type_link');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const elementsTemplate = document.querySelector('#elements-template').content;
const elementsList = document.querySelector('.elements__list');

// попап редактирования профиля
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// попап добавления карточки
const addCard = function (e) {
  e.preventDefault();
  addPopup.classList.add('popup_opened');
};

// закрыть попап
function closePopup(e) {
  if (e.target !== e.currentTarget) {
    return;
  }

  addPopup.classList.remove('popup_opened');
  popup.classList.remove('popup_opened');
  popupImgContainer.classList.remove('popup_opened');
}

function activeLike(likeBtn) {
  likeBtn.target.classList.toggle('elements__like_active');
}

// добавление карточек из массива
function renderElement({ name, link }) {
  const htmlElement = elementsTemplate.cloneNode(true);
  htmlElement.querySelector('.elements__text').textContent = name;
  htmlElement.querySelector('.elements__img').src = link;
  htmlElement.querySelector('.elements__img').alt = 'Картинка ' + name;
  htmlElement.querySelector('.elements__img').addEventListener('click', () => showPopupImgCard(name, link));
  setEventListeners(htmlElement);
  return htmlElement;
}

// Открыть картинку
function showPopupImgCard(name, link) {
  popupTitle.textContent = name;
  popupImage.src = link;
  popupImage.alt = 'Картинка ' + name;
  openPopup(popupImgContainer);
}

elements.forEach((name, link) => {
  elementsList.append(renderElement(name, link));
});

// добавление карточки через попап
function addUserCard(data) {
  elementsList.prepend(data);
}

function handleAddCard(e) {
  e.preventDefault();
  addUserCard(renderElement({ name: inputTitle.value, link: inputLink.value }));
  closePopup(e);
  addForm.reset();
}

function handleFormSubmit(e) {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(e);
}

function handleDelete(e) {
  const card = e.target.closest('.elements__item');
  card.remove();
}

function handleLike(e) {
  const cardLike = e.target.closest('.elements__like');
  cardLike.classList.toggle('elements__like_active');
}

function setEventListeners(htmlElement) {
  htmlElement.querySelector('.elements__delete').addEventListener('click', handleDelete);

  htmlElement.querySelector('.elements__like').addEventListener('click', handleLike);
}

editBtn.addEventListener('click', () => {
  openPopup(popup);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
});
closeBtn.addEventListener('click', closePopup);
closeAddPopupBtn.addEventListener('click', closePopup);
popupClose.addEventListener('click', closePopup);
addBtn.addEventListener('click', addCard);
popup.addEventListener('click', closePopup);
addPopup.addEventListener('click', closePopup);
addForm.addEventListener('submit', renderElement);
createBtn.addEventListener('click', handleAddCard);
popupEditForm.addEventListener('submit', handleFormSubmit);
popupImgContainer.addEventListener('click', closePopup);
