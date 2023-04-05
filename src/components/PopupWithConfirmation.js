import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(selector, buttonYes) {
    super(selector);
    this._popupForm = this._popup.querySelector('.popup__container');
    this._button = buttonYes;
  }

  submitHandler(start){
    this._handleFormSubmit = start;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit({cardId: this._cardId, card: this._card});
    });
  }

  open(cardId, card) {
    super.open();
    this._cardId = cardId;
    this._card = card;
  }
}