export default class Card{
  constructor(item, templateSelector, imageClickHandle, handleTrashClick, handleLikeClick, userId){
    this._templateSelector = templateSelector;
    this._item = item;
    this._name = item.name;
    this._link = item.link;
    // this._id = item._id;
    // this._likes = item.likes;
    // this._ownerId = item.owner._id;
    this._imageClickHandle = imageClickHandle;
    this._handleTrashClick = handleTrashClick;
    this._handleLikeClick = handleLikeClick;
    // this._userId = userId;
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
      this._card.querySelector(".elements__text").textContent = this._name;
      this._cardImg.src = this._link;
      this._cardImg.alt = this._name;

      // if (this._ownerId !== this._userId) {
      //   this._card.querySelector('.elements__trash').remove();
      // };

      this._setEventListeners();
      return this._card;
      }
    
  _setEventListeners() {
    this._cardImg.addEventListener('click', () =>
      this._handleImageClick()
    );
    this._card.querySelector(".elements__like").addEventListener("click", (evt) => {
      this._toggleLike(evt);
    });
    this._card.querySelector(".elements__trash").addEventListener("click", () => {
      this._deleteCard();
    });
    };

    _toggleLike(evt){
      evt.target.classList.toggle("elements__like_active"); 
    }

    _deleteCard(){
      this._card.remove();
    }

    _handleImageClick(){
      this._imageClickHandle({name: this._name, link:this._link})
    }
}
