// console.log('Привет,мир!');

const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__open-popup');
const popupSaveButtonElement = popupElement.querySelector('.popup__save');
const profileElement = document.querySelector('.profile');
let nameInput = popupElement.querySelector('.popup__input-container_type_name');
let jobInput = popupElement.querySelector('.popup__input-container_type_info');
let profileName = profileElement.querySelector('.profile__title');
let profileJob = profileElement.querySelector('.profile__subtitle');

// const togglePopupVisibility = function(){
//  popupElement.classList.toggle('popup_opened');
// }

const openPopup = function(){
    popupElement.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  }
const closePopup = function(){
    popupElement.classList.remove('popup_opened');
  }
  
const closePopupByClickOnOverlay = function(event){
  if (event.target !== event.currentTarget){
    return;
  }
  closePopup();
}

//togglePopupVisibility();

popupOpenButtonElement.addEventListener('click',openPopup);
popupCloseButtonElement.addEventListener('click',closePopup);
popupElement.addEventListener('click',closePopupByClickOnOverlay);
popupElement.addEventListener('submit', handleFormSubmit);

function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
}