import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
  popupOpenButtonElement,
  popupAddButtonElement,
  popupWatchElement,
  containerSelector,
  profileName,
  profileJob,
  popupAddElement,
  popupEditElement,
  options,
  profileEditForm,
  profileAddForm,
} from "../utils/constants.js";
import Section from "../components/Section.js";
import { initialCards } from "../components/initialCards.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const popupWithImage = new PopupWithImage(popupWatchElement);
popupWithImage.setEventListeners();

const submitEditCardHandler = ({ name, subtitle }) => {
  userInfo.setUserInfo({ name, subtitle });
};

const popupEditForm = new PopupWithForm(
  popupEditElement,
  submitEditCardHandler
);
popupEditForm.setEventListeners();
popupOpenButtonElement.addEventListener("click", () => {
  popupEditForm.open();
  popupEditForm.setInputValues(userInfo.getUserInfo());
});

const userInfo = new UserInfo({ profileName, profileJob });

const handleCardClick = ({ name, link }) => {
  popupWithImage.open({ name, link });
};

function createCard(item) {
  const card = new Card(item, "#card-template", handleCardClick).generateCard();
  return card;
}

const section = new Section(
  {    
    renderer: (item) => {
      const elementItem = createCard(item);
      containerSelector.prepend(elementItem);
    },
  },
  ".elements"
);
section.renderItems(initialCards);

const submitAddCardHandler = (item) => {
  section.addItem(createCard({name: item.title, link: item.way}));
};

const popupAddForm = new PopupWithForm(popupAddElement, submitAddCardHandler);

popupAddButtonElement.addEventListener("click", () => {
  popupAddForm.open();
});
popupAddForm.setEventListeners();

const validatorAddCard = new FormValidator(options, profileAddForm);
validatorAddCard.enableValidation();
validatorAddCard.disableSubmitButton();
const validatorEditProfile = new FormValidator(options, profileEditForm);
validatorEditProfile.enableValidation();
