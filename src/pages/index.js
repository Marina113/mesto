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
  popupDeleteElement,
} from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-63",
  headers: {
    authorization: "4c8fe4ba-ddf5-4cbd-b158-fff86875ab55",
    "Content-Type": "application/json",
  },
});

let userId;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([data, items]) => {
    userId = data._id;
    userInfo.setUserInfo(data);
    section.renderItems(items);
  })
  .catch((err) => {
    console.log(err);
  });

const handleCardClick = ({ name, link }) => {
  popupWithImage.open({ name, link });
};

function createCard(data) {
  const card = new Card({
    data,
    userId,
    templateSelector: "#card-template",
    handleCardClick,
    handleDeleteClick: (data) => {
      popupWithConfirmationDel.submitHandler(() => {
        api
          .deleteCard(data)
          .then(() => {
            card.deleteCards(data._id);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            popupWithConfirmationDel.close();
          });
      }),
        popupWithConfirmationDel.open();
    },
    handleLikeClick: () => {
      if (!card.getCardLike()) {
        console.log(card.getCardLike());
        api
          .addLike(data._id)
          .then((data) => {
            card.updateData(data);
          })
          .catch((err) => {
            console.log(err);
          })
      } else {
        api
          .deleteLike(data._id)
          .then((data) => {
            card.updateData(data);
          })
          .catch((err) => {
            console.log(err);
          })
      }
    }
  })
  return card.generateCard(data);
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

//***** Попап подтверждения удаления */
const popupWithConfirmationDel = new PopupWithConfirmation(popupDeleteElement);
popupWithConfirmationDel.setEventListeners();

//***** Попап просмотра картинки */
const popupWithImage = new PopupWithImage(popupWatchElement);
popupWithImage.setEventListeners();

//***** Попап редактирования профиля */
const userInfo = new UserInfo({
  name: profileName,
  subtitle: profileJob,
  avatar: profileAvatarElement,
});

const submitEditCardHandler = (data) => {
  popupEditForm.renderLoading(true);
  api
    .setUserInfo(data)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupEditForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditForm.renderLoading(false, 'Сохранить');
    });
};

const popupEditForm = new PopupWithForm(
  popupEditElement,
  submitEditCardHandler
);
popupEditForm.setEventListeners();

//***** Попап добавления карточки */
const submitAddCardHandler = (data) => {
  popupAddForm.renderLoading(true);
  api
    .addNewCard(data)
    .then((res) => {
      section.addItem(createCard(res));
      popupAddForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAddForm.renderLoading(false, 'Создать');
    });
};

const popupAddForm = new PopupWithForm(popupAddElement, submitAddCardHandler);
popupAddForm.setEventListeners();

//***** Попап редактирования аватара */
const handleFormAvaSubmit = (avatar) => {
  popupAvatarForm.renderLoading(true);
  api
    .changeAvatar(avatar)
    .then((avatar) => {
      userInfo.setUserInfo(avatar);
      popupAvatarForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditForm.renderLoading(false, 'Сохранить');
    });
};

const popupAvatarForm = new PopupWithForm(
  popupAvatarElement,
  handleFormAvaSubmit
);
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
  validatorAvatarCard.disableSubmitButton();
});

//***** Валидация */
const validatorAddCard = new FormValidator(options, profileAddForm);
validatorAddCard.enableValidation();
validatorAddCard.disableSubmitButton();
const validatorEditProfile = new FormValidator(options, profileEditForm);
validatorEditProfile.enableValidation();
const validatorAvatarCard = new FormValidator(options, profileAvatarForm);
validatorAvatarCard.enableValidation();
