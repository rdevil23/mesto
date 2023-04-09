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
const closeBtn = document.querySelectorAll('.popup__close-btn');
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

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    popups.forEach((popup) => {
      if (popup.classList.contains('popup_opened')) {
        closePopup(popup);
      }
    });
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

function renderElement({ name, link }) {
  const htmlElement = elementsTemplate.cloneNode(true);
  htmlElement.querySelector('.elements__text').textContent = name;
  htmlElement.querySelector('.elements__img').src = link;
  htmlElement.querySelector('.elements__img').alt = 'Картинка ' + name;
  htmlElement.querySelector('.elements__img').addEventListener('click', () => showPopupImgCard(name, link));
  setEventListeners(htmlElement);
  return htmlElement;
}

function showPopupImgCard(name, link) {
  popupTitle.textContent = name;
  popupImage.src = link;
  popupImage.alt = 'Картинка ' + name;
  openPopup(popupImgContainer);
}

elements.forEach((name, link) => {
  elementsList.append(renderElement(name, link));
});

function addCard(e) {
  e.preventDefault();
  openPopup(addPopup);
}

function addUserCard(data) {
  elementsList.prepend(data);
}

function handleAddCard(e) {
  e.preventDefault();
  addUserCard(renderElement({ name: inputTitle.value, link: inputLink.value }));
  closePopup(addPopup);
  addForm.reset();
}

function handleFormSubmit(e) {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(profilePopup);
}

function handleDelete(e) {
  const card = e.target.closest('.elements__item');
  card.remove();
}

function activeLike(likeBtn) {
  likeBtn.target.classList.toggle('elements__like_active');
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

addBtn.addEventListener('click', addCard);
createBtn.addEventListener('click', handleAddCard);

addForm.addEventListener('submit', renderElement);
popupEditForm.addEventListener('submit', handleFormSubmit);
