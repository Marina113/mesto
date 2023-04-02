import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._button = this._popup.querySelector('.popup__save');
  }

  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener('click', () => {
      this._handleFormSubmit(this._target);
    });
  }

  setTarget(target) {
    this._target = target;
  }
}