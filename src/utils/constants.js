

//**************    ПОПАПЫ
export const selector = document.querySelectorAll(".popup");
export const popupEditElement = document.querySelector(".popup_type_edit");
export const popupAddElement = document.querySelector(".popup_type_add");
export const popupWatchElement = document.querySelector(".popup_type_watch");
export const popupAvatarElement = document.querySelector(".popup_type_avatar");
export const popupDeleteElement = document.querySelector(".popup_type_del");
export const containerSelector = document.querySelector('.elements');
export const popupCaption = document.querySelector('.popup__input-container');
export const imgWatch = document.querySelector(".popup__picture");

export const profileForm = document.querySelector(".popup__container");
export const profileEditForm = document.querySelector(".popup__container_type_edit");
export const profileAddForm = document.querySelector(".popup__container_type_add");
export const profileAvatarForm = document.querySelector(".popup__container_type_avatar");
export const profileDeleteForm = document.querySelector(".popup__container_type_del");
export const textWatch = document.querySelector(".popup__text");

//**************    КНОПКИ ПОПАПОВ 
export const popupOpenButtonElement = document.querySelector(".profile__open-popup");
export const popupAddButtonElement = document.querySelector(".profile__add-button");
export const popupAvatarButtonElement = document.querySelector(".profile__ava-button");
export const profileAvatarElement = document.querySelector(".profile__ava");
export const popupTrashButtonElement = document.querySelector(".elements__trash");
export const popupButtonSaveElement = document.querySelector(".popup__save");
export const popupButtonSaveAddElement = document.querySelector(".popup__save-add");
export const popupCloseButtonElements = document.querySelectorAll(".popup__close");
const profileElement = document.querySelector(".profile");
export const template = document.querySelector("#card-template").content.querySelector(".elements__item");

export const nameEditInput = popupEditElement.querySelector(".popup__input-container_type_name");
export const jobEditInput = popupEditElement.querySelector(".popup__input-container_type_info");
export const profileName = profileElement.querySelector(".profile__title");
export const profileJob = profileElement.querySelector(".profile__subtitle");
export const nameAddInput = popupAddElement.querySelector(".popup__input-container_type_name");
export const jobAddInput = popupAddElement.querySelector(".popup__input-container_type_info");
export const linkWatchInput = popupWatchElement.querySelector(".popup__picture");

export const options = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input-container',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save-add_disabled',
  inputErrorClass: 'popup__input-container_type_error',
  errorClass: 'popup__input-container-error_active'
};


