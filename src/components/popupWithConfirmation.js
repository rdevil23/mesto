import { Popup } from './popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector('.popup__confirm');
  }

  setSubmitHandler(newFormSubmit) {
    this._formSubmit = newFormSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this._formSubmit();
    });
  }
}
