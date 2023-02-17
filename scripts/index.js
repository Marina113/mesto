//**************    ПОПАПЫ
const popupElements = document.querySelectorAll(".popup");
const popupEditElement = document.querySelector(".popup_type_edit");
const popupAddElement = document.querySelector(".popup_type_add");
const popupWatchElement = document.querySelector(".popup_type_watch");

const profileForm = document.querySelector(".popup__container");
const profileEditForm = document.querySelector(".popup__container_type_edit");
const profileAddForm = document.querySelector(".popup__container_type_add");
const popupTypeWatch = document.querySelector(".popup_type_watch");
const imgWatch = popupTypeWatch.querySelector(".popup__picture");
const textWatch = popupTypeWatch.querySelector(".popup__text");
//**************    КНОПКИ ПОПАПОВ
const popupCloseButtonElements = document.querySelectorAll(".popup__close");
const popupOpenButtonElement = document.querySelector(".profile__open-popup");
const popupAddButtonElement = document.querySelector(".profile__add-button");
const popupTrashButtonElement = document.querySelector(".elements__trash");
const popupButtonSaveElement = document.querySelector(".popup__save");
const popupButtonSaveAddElement = document.querySelector(".popup__save-add");

const profileElement = document.querySelector(".profile");
const template = document.querySelector("#card-template").content.querySelector(".elements__item");
const cards = document.querySelector(".elements");
const popupImgElement = template.querySelector(".elements__picture");

const nameEditInput = popupEditElement.querySelector(".popup__input-container_type_name");
const jobEditInput = popupEditElement.querySelector(".popup__input-container_type_info");
const profileName = profileElement.querySelector(".profile__title");
const profileJob = profileElement.querySelector(".profile__subtitle");
const nameAddInput = popupAddElement.querySelector(".popup__input-container_type_name");
const jobAddInput = popupAddElement.querySelector(".popup__input-container_type_info");
const linkWatchInput = popupTypeWatch.querySelector(".popup__picture");


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
  // popupButtonSaveElement.setAttribute("disabled","");
}
function openWatchPopup() {
  openPopup(popupWatchElement);
}


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

//*************  /////////////// ОБРАБОТЧИКИ СОБЫТИЙ
popupOpenButtonElement.addEventListener("click", openEditPopup);
popupAddButtonElement.addEventListener("click", openAddPopup);
template.addEventListener("click", openWatchPopup);
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


//************* ///////////// ФУНКЦИЯ ДОБАВЛЕНИЯ КАРТОЧЕК
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameEditInput.value;
  profileJob.textContent = jobEditInput.value;
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
  popupButtonSaveAddElement.classList.add("popup__save-add_disabled");
  popupButtonSaveAddElement.setAttribute("disabled","");
  // popupButtonSaveElement.removeAttribute("disabled");
  // popupButtonSaveElement.classList.add(".popup__save-inactive");
  // document.querySelector(".popup__save").disabled = true;
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

