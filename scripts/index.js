// console.log('Привет,мир!');

//*************ПОПАПЫ
const popupElement = document.querySelector('.popup');
const popupEditElement = document.querySelector('.popup_type_edit');
const popupAddElement = document.querySelector('.popup_type_add');
const popupWatchElement = document.querySelector('.popup_type_watch');
const popupForm = document.querySelector('.popup__container_type_edit');
const popupAddForm = document.querySelector('.popup__container_type_add');
//**************КНОПКИ ПОПАПОВ
const popupCloseButtonElement = document.querySelectorAll('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__open-popup');
const popupAddButtonElement = document.querySelector('.profile__add-button');
const popupSaveButtonElement = document.querySelector('.popup__save');
const popupTrashButtonElement = document.querySelector('.elements__trash');

const profileElement = document.querySelector('.profile');
const template = document.querySelector('#card-template').content.querySelector('.elements__item');
const cards = document.querySelector('.elements');

const nameInput = popupElement.querySelector('.popup__input-container_type_name');
const jobInput = popupElement.querySelector('.popup__input-container_type_info');
const profileName = profileElement.querySelector('.profile__title');
const profileJob = profileElement.querySelector('.profile__subtitle');
const nameAddInput = popupAddElement.querySelector('.popup__input-container_type_name');
const jobAddInput = popupAddElement.querySelector('.popup__input-container_type_info');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 
// const togglePopupVisibility = function(){
//  popupElement.classList.toggle('popup_opened');
// }

//*************ОТКРЫТИЕ ПОПАПОВ
  const openPopup = function(){
    popupElement.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  }
  const openPopupAdd = function(){    
    popupAddElement.classList.add('popup_opened');
  }

  //*************ЗАКРЫТИЕ ПОПАПОВ
  const closePopup = function(evt){
    evt.target.closest('.popup').classList.remove('popup_opened');
  }
  const closePopupAdd = function(){
    popupAddElement.classList.remove('popup_opened');
  }
  const closePopupByClickOnOverlay = function(event){
    if (event.target !== event.currentTarget){
      return;
    }
    closePopup();
  }

  popupCloseButtonElement.forEach((closeButton)=>{
    closeButton.addEventListener('click',closePopup);
  });



//togglePopupVisibility();

//*************СЛУШАТЕЛИ
popupOpenButtonElement.addEventListener('click',openPopup);
popupAddButtonElement.addEventListener('click',openPopupAdd);
popupElement.addEventListener('click',closePopupByClickOnOverlay);
popupElement.addEventListener('submit', handleFormSubmit);
popupAddForm.addEventListener('submit', handleFormAddSubmit);

popupSaveButtonElement.addEventListener('click',() =>{
  e.preventDefault();
  const name = input.value;
  const card = template.cloneNode(true);
    card.querySelector('.elements__text').textContent = name;
    const cardImg = card.querySelector('.elements__picture').src = link;
    renderCards(card);
})


//*************ФУНКЦИЯ ДОБАВЛЕНИЯ КАРТОЧЕК
function handleFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(evt);
}

function handleFormAddSubmit (evt) {
  evt.preventDefault(); 
  const addCard = [{
    name: nameAddInput.value,
    link: jobAddInput.value
  }];
  renderCards(addCard);
  closePopup(evt);
}

function renderCards(initialCards){
  initialCards.forEach((item) => {
    const card = template.cloneNode(true);
    card.querySelector('.elements__text').textContent = item.name;
    const cardImg = card.querySelector('.elements__picture').src = item.link;
    const cardAlt = card.querySelector('.elements__picture_type_alt').alt = item.alt;
    cards.prepend(card);
    card.querySelector('.elements__like').addEventListener('click',function (evt) { 
      evt.target.classList.toggle('elements__like_active')
    });
    card.querySelector('.elements__trash').addEventListener('click',() => {
    card.remove();
    });    

    return card;
  });
}
renderCards(initialCards);

