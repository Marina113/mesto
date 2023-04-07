import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(selector) {
    super(selector);
    this._popupForm = this._popup.querySelector('.popup__container');
    // this._button = buttonYes;
  }

  submitHandler(action){
    this._handleFormSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      // this._handleFormSubmit({cardId: this._cardId, cards: this._cards});
      this._handleFormSubmit();

    });
  }

  // open({cardId, cards}) {
  //   super.open();
  //   this._cardId = cardId;
  //   this._cards = cards;
  // }
}