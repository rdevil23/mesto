export default class Card {
  constructor(data, templateSelector, showPopupImgCard) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._showPopupImgCard = showPopupImgCard;
  }

  // метод копирования темплейта
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.elements__item').cloneNode(true);
    return cardElement;
  }

  // метод удаления карточки
  _onDelete = () => {
    this._element.remove();
  };

  // метод лайка карточки
  _onLike = () => {
    this._element.querySelector('.elements__like').classList.toggle('elements__like_active');
  };

  // метод открытия попапа картинки
  _onOpenImgPopup = () => {
    this._showPopupImgCard(this._data);
  };

  // метод со всеми слушателями карточки
  _setEventListeners() {
    this._element.querySelector('.elements__delete').addEventListener('click', this._onDelete);
    this._element.querySelector('.elements__like').addEventListener('click', this._onLike);
    this._element.querySelector('.elements__img').addEventListener('click', this._onOpenImgPopup);
  }

  // метод генерирования карточки
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.elements__text').textContent = this._name;
    this._element.querySelector('.elements__img').src = this._link;
    this._element.querySelector('.elements__img').alt = 'Картинка ' + this._name;
    return this._element;
  }
}
