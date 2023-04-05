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
  profileAvatarElement,
  popupDeleteElement
} from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization:'4c8fe4ba-ddf5-4cbd-b158-fff86875ab55',
  'Content-Type': 'application/json'}
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([data, items]) => {
    // userId = data._id;
    userInfo.setUserInfo(data);
    section.renderItems(items);
  })
  .catch((err) => {
    console.log(err);
});


const handleCardClick = ({ name, link }) => {
  popupWithImage.open({ name, link });
};

const handleDeleteClick = (cardId, card) => {
      popupWithConfirmationDel.open(cardId, card);
      popupWithConfirmationDel.submitHandler((data) => {
        popupWithConfirmationDel.renderLoading(true);
        api.deleteCard(data)
        .then(() => {
          popupWithConfirmationDel.close();
          card.deleteCard();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupWithConfirmationDel.renderLoading(false)
        })
      })     
}

const handleLikeClick = (likes) => {

}

function createCard(item) {
  const card = new Card(item,
     "#card-template",
     handleCardClick,
     handleDeleteClick,
     handleLikeClick,
     userInfo.getUserInfo().userId)
     .generateCard(); 
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

const popupWithConfirmationDel = new PopupWithConfirmation(popupDeleteElement);
popupWithConfirmationDel.setEventListeners();

 //***** Попап просмотра картинки */
 const popupWithImage = new PopupWithImage(popupWatchElement);
 popupWithImage.setEventListeners(); 
 
 //***** Попап редактирования профиля */
 const userInfo = new UserInfo({ name: profileName, subtitle: profileJob,avatar: profileAvatarElement}); 

 const submitEditCardHandler = ( data ) => {
  popupEditForm.renderLoading(true)
   api.setUserInfo(data)
    .then(( res ) => {
      userInfo.setUserInfo(res);
      popupEditForm.close()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditForm.renderLoading(false)
    })
 };
 
 const popupEditForm = new PopupWithForm(popupEditElement,submitEditCardHandler); 
 popupEditForm.setEventListeners();




 //***** Попап добавления карточки */
const submitAddCardHandler = (data) => {
  popupAddForm.renderLoading(true)
  api.addNewCard(data)
  .then((res) => {
    // section.addItem(createCard(res), true);
    section.addItem(res);
    popupAddForm.close()
    })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupAddForm.renderLoading(false)
  })
};

const popupAddForm = new PopupWithForm(popupAddElement, submitAddCardHandler);
popupAddForm.setEventListeners();




//***** Попап редактирования аватара */
const handleFormAvaSubmit = (avatar) => {
  api.changeAvatar(avatar)
  .then((avatar) => {
    userInfo.setUserInfo(avatar);
    popupAvatarForm.close();
  })
  .catch((err) => {
    console.log(err);
  });
}

const popupAvatarForm = new PopupWithForm(popupAvatarElement,handleFormAvaSubmit);
popupAvatarForm.setEventListeners();

popupOpenButtonElement.addEventListener("click", () => {
  popupEditForm.open();
  popupEditForm.setInputValues(userInfo.getUserInfo());
});
popupAddButtonElement.addEventListener("click", () => {
  popupAddForm.open();
  validatorAddCard.disableSubmitButton();
});
popupAvatarButtonElement.addEventListener("click", () => {
  popupAvatarForm.open();
});

//***** Валидация */
const validatorAddCard = new FormValidator(options, profileAddForm);
validatorAddCard.enableValidation();
validatorAddCard.disableSubmitButton();
const validatorEditProfile = new FormValidator(options, profileEditForm);
validatorEditProfile.enableValidation();
const validatorAvatarCard = new FormValidator(options, profileAvatarForm);
validatorAvatarCard.enableValidation();