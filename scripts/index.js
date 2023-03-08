import {Card} from './Card.js';
import {initialCards} from './initialCards.js';
import {FormValidator} from './FormValidator.js';

//**************    ПОПАПЫ
const popupElements = document.querySelectorAll(".popup");
const popupEditElement = document.querySelector(".popup_type_edit");
const popupAddElement = document.querySelector(".popup_type_add");
const popupWatchElement = document.querySelector(".popup_type_watch");
const cards = document.querySelector(".elements");
const popupCaption = document.querySelector('.popup__input-container');
const imgWatch = document.querySelector(".popup__picture");

const profileForm = document.querySelector(".popup__container");
const profileEditForm = document.querySelector(".popup__container_type_edit");
const profileAddForm = document.querySelector(".popup__container_type_add");
const popupTypeWatch = document.querySelector(".popup_type_watch");
const textWatch = document.querySelector(".popup__text");

//**************    КНОПКИ ПОПАПОВ
const popupOpenButtonElement = document.querySelector(".profile__open-popup");
const popupAddButtonElement = document.querySelector(".profile__add-button");
const popupTrashButtonElement = document.querySelector(".elements__trash");
const popupButtonSaveElement = document.querySelector(".popup__save");
const popupButtonSaveAddElement = document.querySelector(".popup__save-add");
const popupCloseButtonElements = document.querySelectorAll(".popup__close");
const profileElement = document.querySelector(".profile");
const template = document.querySelector("#card-template").content.querySelector(".elements__item");

const nameEditInput = popupEditElement.querySelector(".popup__input-container_type_name");
const jobEditInput = popupEditElement.querySelector(".popup__input-container_type_info");
const profileName = profileElement.querySelector(".profile__title");
const profileJob = profileElement.querySelector(".profile__subtitle");
const nameAddInput = popupAddElement.querySelector(".popup__input-container_type_name");
const jobAddInput = popupAddElement.querySelector(".popup__input-container_type_info");
const linkWatchInput = popupTypeWatch.querySelector(".popup__picture");

const options = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input-container',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save-add_disabled',
  inputErrorClass: 'popup__input-container_type_error',
  errorClass: 'popup__input-container-error_active'
};

const validatorEditProfile = new FormValidator(options, profileEditForm);
validatorEditProfile.enableValidation();
const validatorAddCard = new FormValidator(options, profileAddForm);
validatorAddCard.enableValidation();

//*************    ОТКРЫТИЕ ПОПАПОВ
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown",closeByClickEsc);
}
function openEditPopup() {
  nameEditInput.value = profileName.textContent;
  jobEditInput.value = profileJob.textContent;
  openPopup(popupEditElement);
}
function openAddPopup() {
  openPopup(popupAddElement);
}

//*************    ОТКРЫТИЕ ПОПАПА ПРОСМОТРА
function handleOpenPopup(item){
  imgWatch.src = item.link;
  textWatch.textContent = item.name;
  imgWatch.alt = item.name;
  openPopup(popupWatchElement);
};

//*************    ЗАКРЫТИЕ ПОПАПОВ
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown",closeByClickEsc);
}
function closeEditPopup() {
  closePopup(popupEditElement);
}
function closeAddPopup() {
  closePopup(popupAddElement);
}
function closeWatchPopup() {
  closePopup(popupWatchElement);
}

//************* ///////////// ФУНКЦИЯ ДОБАВЛЕНИЯ КАРТОЧЕК
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameEditInput.value;
  profileJob.textContent = jobEditInput.value;
  closePopup(popupEditElement);
};

function generateCard(item){
  const cardItem = new Card(item, '#card-template', handleOpenPopup);
  return cardItem.generateCard();
}

//*************  /////////////// ОБРАБОТЧИКИ СОБЫТИЙ
popupOpenButtonElement.addEventListener("click", openEditPopup);
popupAddButtonElement.addEventListener("click", openAddPopup);
profileEditForm.addEventListener("submit", handleProfileFormSubmit);
profileAddForm.addEventListener("submit", handleProfileFormAddSubmit);

popupCloseButtonElements.forEach((closeButton) => {
  closeButton.addEventListener("click", (evt) => {
    closePopup(evt.target.closest(".popup"));
  });
});

profileForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
});

function renderCards  (item) {
  const card = generateCard(item);
  cards.prepend(card);
};

initialCards.forEach(function (item) {
  renderCards(item);
});

function handleProfileFormAddSubmit(evt) {
  evt.preventDefault();
  const addCard = {
    name: nameAddInput.value,
    link: jobAddInput.value,
  };
  renderCards(addCard);
  closePopup(popupAddElement);
  profileAddForm.reset();
  popupButtonSaveAddElement.setAttribute("disabled","");
}

//***********    Закрытие по клику на оверлей
const closePopupByClickOnOverlay = function (event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup(event.target);
};

popupElements.forEach((popup) => {
  popup.addEventListener("click", closePopupByClickOnOverlay);
});

//************  ЗАКРЫТИЕ ПО ESCAPE
function closeByClickEsc(event){
  if(event.key === "Escape"){
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};