import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popup.querySelectorAll(".popup__input-container");
    this._popupForm = this._popup.querySelector(".popup__container");
    this._submitButton = this._popup.querySelector(".popup__save");
    this._originalButtonText = this._submitButton.textContent;

  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  blockSubmitButton(blockedButtonText = 'Сохранение...') {
    this._blockedButtonText = blockedButtonText;
    this._submitButton.disabled = true;
    this._submitButton.textContent = this._blockedButtonText;
  }

  unblockSubmitButton() {
    this._submitButton.disabled = false;
    this._submitButton.textContent = this._originalButtonText;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
      // this._popupForm.reset();
    });
  }

  setInputValues(item) {
    this._inputList.forEach((input) => {
      input.value = item[input.name];
    });
  }
}
