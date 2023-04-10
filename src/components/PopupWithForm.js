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

  renderLoading(isLoading, text = 'Сохранение...') {
    this._submitButton.disabled = isLoading;
    this._submitButton.textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  setInputValues(item) {
    this._inputList.forEach((input) => {
      input.value = item[input.name];
    });
  }
}
