export default class Card{
  constructor(data, templateSelector, imageClickHandle, handleDeleteClick, handleLikeClick, userId){
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    // this._ownerId = data.ownerId;
    // this._userId = userId;
    // this._likes = data.likes;
    this._likesLength = data.likes.length;
    this._imageClickHandle = imageClickHandle;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
   
  }

  _getTemplate(){
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.elements__item')
    .cloneNode(true);
    return cardElement;
  }

  isLiked() {
    return this._likes.some((item) => item._id === this._userId);
  }

  generateCard(){      //Добавление данных
        // Запишем разметку в приватное поле _card.
      this._card = this._getTemplate();
      this._cardImg = this._card.querySelector(".elements__picture");
      this._card.querySelector(".elements__text").textContent = this._name;
      this._cardImg.src = this._link;
      this._cardImg.alt = this._name;
      this._buttonLike= this._card.querySelector(".elements__like");
      this._buttonDelete = this._card.querySelector(".elements__trash");
      this._likeNumber = this._card.querySelector('.elements__like-click');
      this._likeNumber.textContent = this._likesLength;

      if (this._ownerId !== this._userId) {
        this._card.querySelector('.elements__trash').remove();
      };

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
    // if (this._element.querySelector('.elements__trash')) {
    //   this._element.querySelector('.elements__trash').addEventListener('click', () => this._handleDelete());
    // }
    };

    _toggleLike(evt){
      evt.target.classList.toggle("elements__like_active"); 
    }

    deleteCard(){
      this._card.remove();
    }

    // * Обрабатывает нажатие на удаление карточки    
    _handleDelete () {
       this._handleDeleteClick(this._id);
   } 

    _handleImageClick(){
      this._imageClickHandle({name: this._name, link:this._link})
    }

    _isLiked(){

    }
}
