import { Popup } from './popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._name = this._popupElement.querySelector('.popup__img-title');
    this._image = this._popupElement.querySelector('.popup__img');
  }

  open(name, link) {
    super.open(name, link);
    this._name.textContent = name;
    this._image.src = link;
    this._image.alt = 'Картинка ' + name;
  }
}
