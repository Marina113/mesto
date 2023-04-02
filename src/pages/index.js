import "./index.css";
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
  popupAvatarElement,
  profileAvatarForm,
  popupAvatarButtonElement,
  popupDeleteElement,
  popupTrashButtonElement,
  profileAvatarElement
} from "../utils/constants.js";
import Section from "../components/Section.js";
import { initialCards } from "../utils/initialCards.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
// Api.getUserInfo()
// .then(res => console.log(res))

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: '4c8fe4ba-ddf5-4cbd-b158-fff86875ab55',
    'Content-Type': 'application/json'
  }
});

// const cards = api.getInitialCards();
// cards.then((data) => {
  
// }).catch((err) => {
//   console.log(err); // "Что-то пошло не так: ..."
// }); 





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

 //*********** ПОПАПЫ */

 const popupWithImage = new PopupWithImage(popupWatchElement);
 popupWithImage.setEventListeners(); 
 

 //***** Попап редактирования профиля */
 const userInfo = new UserInfo({ profileName, profileJob,profileAvatarElement}); 

 const submitEditCardHandler = ({ name, subtitle }) => {
  //  api.setUserInfo({name,subtitle})
  //   .then(({ name, subtitle }) => {
      userInfo.setUserInfo({ name, subtitle });
      popupEditForm.close()
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
 };
 
 const popupEditForm = new PopupWithForm(popupEditElement,submitEditCardHandler); 
 popupEditForm.setEventListeners();
 popupOpenButtonElement.addEventListener("click", () => {
   popupEditForm.open();
   popupEditForm.setInputValues(userInfo.getUserInfo());
 });

 //***** Попап добавления карточки */
const submitAddCardHandler = (item) => {
  section.addItem(createCard({name: item.title, link: item.way}));
};
const popupAddForm = new PopupWithForm(popupAddElement, submitAddCardHandler); 
popupAddButtonElement.addEventListener("click", () => {
  popupAddForm.open();
  validatorAddCard.disableSubmitButton();
});
popupAddForm.setEventListeners(); 



//***** Попап редактирования аватара */
const handleFormAvaSubmit = ({avatar}) => {
  api.changeAvatar({avatar})
  .then(({avatar}) => {
    userInfo.setAvaInfo({avatar});
    userInfo.renderAvatar();
    popupAvatarForm.close()
  })
  .catch((err) => {
    console.log(err);
  });
}

const popupAvatarForm = new PopupWithForm(popupAvatarElement,handleFormAvaSubmit);
popupAvatarButtonElement.addEventListener("click", () => {
  popupAvatarForm.open();
});
popupAvatarForm.setEventListeners();



const validatorAddCard = new FormValidator(options, profileAddForm);
validatorAddCard.enableValidation();
validatorAddCard.disableSubmitButton();
const validatorEditProfile = new FormValidator(options, profileEditForm);
validatorEditProfile.enableValidation();
const validatorAvatarCard = new FormValidator(options, profileAvatarForm);
validatorAvatarCard.enableValidation();