export class Card{
  constructor(item, templateSelector, handleOpenPopup){
    this._templateSelector = templateSelector;
    this._item = item;
    this._handleOpenPopup = handleOpenPopup;
  }

  _getTemplate(){
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.elements__item')
    .cloneNode(true);
    return cardElement;
  }

  generateCard(){      //Добавление данных
        // Запишем разметку в приватное поле _card.
      this._card = this._getTemplate();
      this._cardImg = this._card.querySelector(".elements__picture");
      this._card.querySelector(".elements__text").textContent = this._item.name;
      this._cardImg.src = this._item.link;
      this._cardImg.alt = this._item.name;
      this._setEventListeners();
      return this._card;
      }
    
  _setEventListeners() {
    this._cardImg.addEventListener('click', () => 
      this._handleOpenPopup(this._item)
    );

    this._card.querySelector(".elements__like").addEventListener("click", (evt) => {
      evt.target.classList.toggle("elements__like_active");
    });

    this._card.querySelector(".elements__trash").addEventListener("click", () => {
      this._card.remove();
    });
    };
}
