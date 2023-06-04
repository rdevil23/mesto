import './index.css';
import {
  apiConfig,
  nameSelector,
  aboutSelector,
  avatarSelector,
  popupEditForm,
  addForm,
  avatarForm,
  editBtn,
  addBtn,
  editAvatarBtn,
  elementsList,
  validationConfig,
} from '../utils/constants.js';
import Card from '../components/card.js';
import FormValidator from '../components/formValidator.js';
import Section from '../components/section.js';
import PopupWithForm from '../components/popupWithForm.js';
import PopupWithImage from '../components/popupWithImage.js';
import PopupWithConfirmation from '../components/popupWithConfirmation.js';
import UserInfo from '../components/userInfo.js';
import Api from '../components/api.js';

const api = new Api(apiConfig);

// экземпляр профиля
const userInfo = new UserInfo({ name: nameSelector, about: aboutSelector, avatar: avatarSelector });

// экземпляр попапа, который уточняет, удалять ли карточку
const popupWithConfirmation = new PopupWithConfirmation({ popupSelector: '.confirm-popup' });
popupWithConfirmation.setEventListeners();

// экземпляр попапа картинки
const popupImage = new PopupWithImage({ popupSelector: '.popup_type_open-img' });
popupImage.setEventListeners();

// валидация инпутов при редактировании профиля
const profileValidation = new FormValidator(validationConfig, popupEditForm);
profileValidation.enableValidation();
// валидация инпута изменения аватарки пользователя
const avatarValidation = new FormValidator(validationConfig, avatarForm);
avatarValidation.enableValidation();
// валидация инпутов при добавлении новой карточки
const addCardValidation = new FormValidator(validationConfig, addForm);
addCardValidation.enableValidation();

// Получение данных профиля с сервера
api
  .getUserInfo()
  .then((res) => {
    const userData = res;
    userInfo.setUserInfo({ name: userData.name, about: userData.about, avatar: userData.avatar, userId: userData._id });
  })
  .catch((error) => {
    console.log(`Ошибка при загрузке исходных данных: ${error}`);
  });

// Получение карточек с сервера
api
  .getCards()
  .then((res) => {
    const items = res;
    renderCards.renderItems(items);
  })
  .catch((error) => {
    console.log(`Ошибка при загрузке исходных данных: ${error}`);
  });

// Отрисовка карточек с сервера
const renderCards = new Section(
  {
    renderer: (cardData) => {
      const card = new Card({
        cardData,
        templateSelector: '#elements-template',
        userId: userInfo.getUserId(),
        handleCardClick: (name, link) => {
          popupImage.open(name, link);
        },
        handleLikeCardClick: () => {
          if (card.isLiked) {
            api
              .deleteCardLike(card.getCardId())
              .then((cardData) => {
                card.removeLike();
                card.updatelikes(cardData.likes);
              })
              .catch((err) => {
                console.error(err);
              });
          } else {
            api
              .likeCard(card.getCardId())
              .then((cardData) => {
                card.addLike();
                card.updatelikes(cardData.likes);
              })
              .catch((err) => {
                console.error(err);
              });
          }
        },
        handleRemoveCardClick: (e) => {
          const cardElement = e.target.closest('.elements__item');
          popupWithConfirmation.open();
          popupWithConfirmation.setSubmitHandler(() => {
            api
              .removeCard(card.getCardId())
              .then(() => {
                cardElement.remove();
                popupWithConfirmation.close();
              })
              .catch((err) => {
                console.error(err);
              });
          });
        },
      });
      return card.generateCard();
    },
  },
  elementsList
);

// изменение аватара пользователя
const updateUserAvatarPopup = new PopupWithForm({ popupSelector: '.avatar-popup' }, (formValues) => {
  updateUserAvatarPopup.renderLoadingBtn(true);
  api
    .updateUserAvatar({ avatar: formValues.url })
    .then((data) => {
      userInfo.setUserAvatar({ newUserAvatar: data.avatar });
      updateUserAvatarPopup.close();
      avatarForm.reset();
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      updateUserAvatarPopup.renderLoadingBtn(false);
    });
});

updateUserAvatarPopup.setEventListeners();

editAvatarBtn.addEventListener('click', () => {
  avatarValidation.removeInputErrors();
  updateUserAvatarPopup.open();
});

// Изменение данных профиля
const profileEditPopup = new PopupWithForm({ popupSelector: '.profile-popup' }, (formValues) => {
  profileEditPopup.renderLoadingBtn(true);
  api
    .updateUserInfo(formValues)
    .then((formValues) => {
      userInfo.newUserInfo(formValues);
      profileEditPopup.close();
    })
    .catch((error) => {
      console.log(`Ошибка: ${error} - не удалось обновить профиль`);
    })
    .finally(() => {
      profileEditPopup.renderLoadingBtn(false);
    });
});
profileEditPopup.setEventListeners();

// слушатель на открытие попапа редактирования профиля и подгрузка текущих данных профиля в инпуты
editBtn.addEventListener('click', () => {
  profileValidation.removeInputErrors();
  const userData = userInfo.getUserInfo();
  profileEditPopup.setInputValues(userData);
  profileEditPopup.open();
});

// Добавление новой карточки
const addCardPopup = new PopupWithForm({ popupSelector: '.add-popup' }, (inputValues) => {
  addCardPopup.renderLoadingBtn(true);
  api
    .addNewCard(inputValues)
    .then((inputValues) => {
      renderCards.addItem(inputValues);
      addCardPopup.close();
      addForm.reset();
    })
    .catch((error) => {
      console.log(`Ошибка: ${error} - не удалось добавить новую карточку`);
    })
    .finally(() => {
      addCardPopup.renderLoadingBtn(false);
    });
});

addCardPopup.setEventListeners();

// слушатель на открытие попапа добавления карточки
addBtn.addEventListener('click', () => {
  addCardValidation.removeInputErrors();
  addCardPopup.open();
});
