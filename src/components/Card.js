export default class Card {
  constructor({
    data,
    userId,
    templateSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick
  }) {
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id; //id карточки
    this._ownerId = data.owner._id; //владелец
    this._userId = userId; //пользователь
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._likeNumber = data.likes.length;
    this._likes = data.likes;
    this._data = data;
    this._isLiked = this._likes.some(function (like) {
      return like._id === userId;
    })
    console.log(this._isLiked );
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__item")
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    //Добавление данных
    this._card = this._getTemplate();
    this._cardImg = this._card.querySelector(".elements__picture");
    this._card.querySelector(".elements__text").textContent = this._name;
    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;
    this._buttonDelete = this._card.querySelector(".elements__trash");
    this._buttonLike= this._card.querySelector(".elements__like");
    this._likeNumberClick = this._card.querySelector('.elements__like-click');
    this._likeNumberClick.textContent = this._likes.length;
    this._deleteTrash();
    this._updateLikes();
    this._setEventListeners();
    return this._card;
}

  _deleteTrash() {
    if (this._ownerId !== this._userId) {
      this._buttonDelete.remove();
    }
  }

  deleteCards = () => {
    this._card.remove();
    this._card = null
  };

  isLiked() {
    return this._likes.some((data) => data._id === this._userId);
  }

  getCardLike(){
    return this._isLiked;
  }

  updateData(data){
    this._likeNumberClick = this._card.querySelector('.elements__like-click');
    this._likeNumberClick.textContent = data.likes.length;
    this._isLiked = !this._isLiked;
    this._updateLikes();
  }
  
  _updateLikes() {
    if (this._isLiked) {
      this._buttonLike.classList.add('elements__like_active');
    } else {
      this._buttonLike.classList.remove('elements__like_active');
    }
  }
  
  _setEventListeners() {
    this._cardImg.addEventListener("click", () => this._handleImageClick());
    this._buttonLike.addEventListener("click", () => this._handleLikeClick());
    this._buttonDelete.addEventListener("click", () => this._handleDeleteClick(this._cardId)
    );
  }

  _handleImageClick() {
    this._handleCardClick({ name: this._name, link: this._link });
  }
}
