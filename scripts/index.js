// console.log('Привет,мир!');

//**************    ПОПАПЫ
const popupElements = document.querySelectorAll(".popup");
const popupEditElement = document.querySelector(".popup_type_edit");
const popupAddElement = document.querySelector(".popup_type_add");
const popupWatchElement = document.querySelector(".popup_type_watch");
const profileEditForm = document.querySelector(".popup__container_type_edit");
const profileAddForm = document.querySelector(".popup__container_type_add");
const popupTypeWatch = document.querySelector(".popup_type_watch");
const imgWatch = popupTypeWatch.querySelector(".popup__picture");
const textWatch = popupTypeWatch.querySelector(".popup__text");
//**************    КНОПКИ ПОПАПОВ
const popupCloseButtonElements = document.querySelectorAll(".popup__close");
const popupOpenButtonElement = document.querySelector(".profile__open-popup");
const popupAddButtonElement = document.querySelector(".profile__add-button");
const popupSaveButtonElement = document.querySelector(".popup__save");
const popupTrashButtonElement = document.querySelector(".elements__trash");

const profileElement = document.querySelector(".profile");
const template = document
  .querySelector("#card-template")
  .content.querySelector(".elements__item");
const cards = document.querySelector(".elements");
const popupImgElement = template.querySelector(".elements__picture");

const inputType = popupEditElement.querySelector(".popup__input-container");
const nameInput = popupEditElement.querySelector(
  ".popup__input-container_type_name"
);
const jobInput = popupEditElement.querySelector(
  ".popup__input-container_type_info"
);
const profileName = profileElement.querySelector(".profile__title");
const profileJob = profileElement.querySelector(".profile__subtitle");
const nameAddInput = popupAddElement.querySelector(
  ".popup__input-container_type_name"
);
const jobAddInput = popupAddElement.querySelector(
  ".popup__input-container_type_info"
);
const linkWatchInput = popupTypeWatch.querySelector(".popup__picture");

//*************    ОТКРЫТИЕ ПОПАПОВ
function openPopup(popup) {
  popup.classList.add("popup_opened");
}
function openEditPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEditElement);
}
function openAddPopup() {
  openPopup(popupAddElement);
}
function openWatchPopup() {
  openPopup(popupWatchElement);
}

//*************    ЗАКРЫТИЕ ПОПАПОВ
function closePopup(popup) {
  popup.classList.remove("popup_opened");
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
const closePopupByClickOnOverlay = function (event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup(event.target);
};

popupCloseButtonElements.forEach((closeButton) => {
  closeButton.addEventListener("click", (evt) => {
    closePopup(evt.target.closest(".popup"));
  });
});

//*************   СЛУШАТЕЛИ
popupOpenButtonElement.addEventListener("click", openEditPopup);
popupAddButtonElement.addEventListener("click", openAddPopup);
template.addEventListener("click", openWatchPopup);
popupElements.forEach((popup) => {
  popup.addEventListener("click", closePopupByClickOnOverlay);
});
profileEditForm.addEventListener("submit", handleProfileFormSubmit);
profileAddForm.addEventListener("submit", handleProfileFormAddSubmit);

//*************  ФУНКЦИЯ ДОБАВЛЕНИЯ КАРТОЧЕК
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditElement);
};

const renderCards = (item) => {
  const card = createCard(item);
  cards.prepend(card);
};

initialCards.forEach(function (item) {
  renderCards(item);
});

function createCard(item) {
  const card = template.cloneNode(true);
  card.querySelector(".elements__text").textContent = item.name;
  const cardImg = card.querySelector(".elements__picture");
  cardImg.src = item.link;
  cardImg.alt = item.name;
  cardImg.addEventListener("click", function () {
    openPopup(popupWatchElement);
    imgWatch.src = item.link;
    textWatch.textContent = item.name;
    imgWatch.alt = item.name;
  });
  card
    .querySelector(".elements__like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("elements__like_active");
    });
  card.querySelector(".elements__trash").addEventListener("click", () => {
    card.remove();
  });
  // });
  return card;
}

function handleProfileFormAddSubmit(evt) {
  evt.preventDefault();
  const addCard = {
    name: nameAddInput.value,
    link: jobAddInput.value,
  };
  renderCards(addCard);
  closePopup(popupAddElement);
  profileAddForm.reset();
}
