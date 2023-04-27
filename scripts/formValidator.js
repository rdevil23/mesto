export default class FormValidator {
  constructor(validationConfig, form) {
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;
    this._form = form;
    // берем список инпутов с конкретной формы
    this._inputList = form.querySelectorAll(this._inputSelector);
    // берем кнопку с конкретной формы
    this._submitButton = form.querySelector(this._submitButtonSelector);
  }

  // метод проверки всех полей на валидность
  _hasInvalidInput = () => {
    return Array.from(this._inputList).some((inputElement) => !inputElement.validity.valid);
  };

  // метод отображения ошибки
  _showError = function (errorElement, inputElement) {
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  };

  // метод скрытия ошибки
  _hideError = function (errorElement, inputElement) {
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  };

  // метод вызова отображения/скрытия ошибки
  _checkInputValidity = (inputElement) => {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);

    if (!inputElement.validity.valid) {
      return this._showError(errorElement, inputElement);
    } else {
      return this._hideError(errorElement, inputElement);
    }
  };

  // метод переключения состояние кнопки
  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.setAttribute('disabled', true);
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');
    }
  }

  _setValidListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setValidListeners();
  }
}
