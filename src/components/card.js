export default class Card {
  constructor({ cardData, templateSelector, userId, handleCardClick, handleLikeCardClick, handleRemoveCardClick }) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes;
    this._cardId = cardData._id;

    this._templateSelector = templateSelector;

    this._userId = userId;
    this._isUserCard = userId === cardData.owner._id;

    this._handleCardClick = handleCardClick;
    this._handleLikeCardClick = handleLikeCardClick;
    this._handleRemoveCardClick = handleRemoveCardClick;
  }

  // метод копирования темплейта
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.elements__item').cloneNode(true);
    return cardElement;
  }

  // метод генерирования карточки
  generateCard() {
    this._element = this._getTemplate();

    this._elementImg = this._element.querySelector('.elements__img');

    this._element.querySelector('.elements__text').textContent = this._name;
    this._elementImg.src = this._link;
    this._elementImg.alt = 'Картинка ' + this._name;

    this._buttonDelete = this._element.querySelector('.elements__delete');

    this._buttonLike = this._element.querySelector('.elements__like');
    this._likesCounter = this._element.querySelector('.elements__likes-counter');
    this._likesCounter.textContent = this._likes.length;

    this._setEventListeners();
    this._countLikes();

    return this._element;
  }

  // метод со всеми слушателями карточки
  _setEventListeners() {
    if (!this._isUserCard) {
      this._buttonDelete.remove();
      this._buttonDelete = null;
    } else {
      this._buttonDelete.addEventListener('click', (e) => {
        this._handleRemoveCardClick(e);
      });
    }
    // this._buttonDelete.addEventListener('click', this._onDelete);
    this._buttonLike.addEventListener('click', () => {
      this._handleLikeCardClick();
    });
    this._elementImg.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  // счетчик лайков
  _countLikes() {
    if (this._checkUserLikes()) {
      this.addLike();
    } else {
      this.removeLike();
    }
  }

  _checkUserLikes() {
    return this._likes.some((item) => item._id === this._userId);
  }

  // метод лайка карточки
  addLike = () => {
    // this._element.querySelector('.elements__like').classList.toggle('elements__like_active');
    this._element.querySelector('.elements__like').classList.add('elements__like_active');
    this.isLiked = true;
  };

  // убираем лайк
  removeLike = () => {
    this._element.querySelector('.elements__like').classList.remove('elements__like_active');
    this.isLiked = false;
  };

  updatelikes(data) {
    this._likesCounter.textContent = data.length;
  }

  getCardId() {
    return this._cardId;
  }
}
