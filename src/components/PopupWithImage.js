import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
  constructor(popup){
    super(popup);
    this._image = this._popup.querySelector('.popup__picture');
    this._title = this._popup.querySelector('.popup__text');
  }

  open({name, link}){
    super.open();
    this._image.src = link;
    this._title.textContent = name;
    this._image.alt = name;
  }
}
