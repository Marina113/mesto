export default class Card {
  constructor({
    data,
    userId,
    templateSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick,
  }) {
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id; //id карточки
    this._ownerId = data.owner._id; //владелец
    this._userId = userId; //пользователь
    this._likes = data.likes;
    // this._likesLength = data.likes.length;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._data = data
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__item")
      .cloneNode(true);
    return cardElement;
  }

  // isLiked() {
  //   return this._likes.some((item) => item._id === this._userId);
  // }

  generateCard() {
    //Добавление данных
    // Запишем разметку в приватное поле _card.
    this._card = this._getTemplate();
    this._cardImg = this._card.querySelector(".elements__picture");
    this._card.querySelector(".elements__text").textContent = this._name;
    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;
    // this._buttonLike= this._card.querySelector(".elements__like");
    this._buttonDelete = this._card.querySelector(".elements__trash");
    // this._likeNumber = this._card.querySelector('.elements__like-click');
    // this._likeNumber.textContent = this._likesLength;

    this._deleteTrash();

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
  };

  _setEventListeners() {
    this._cardImg.addEventListener("click", () => this._handleImageClick());
    this._card
      .querySelector(".elements__like")
      .addEventListener("click", (evt) => {
        this._toggleLike(evt);
      });

    this._buttonDelete.addEventListener("click", () =>
      this._handleDeleteClick()
    );
  }

  _toggleLike(evt) {
    evt.target.classList.toggle("elements__like_active");
  }



  // * Обрабатывает нажатие на удаление карточки
  //   _handleDelete () {
  //      this._handleDeleteClick(this._cardId);
  //  }

  _handleImageClick() {
    this._handleCardClick({ name: this._name, link: this._link });
  }

  // _isLiked(){

  // }
}
