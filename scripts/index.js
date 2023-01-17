// console.log('Привет,мир!');

// Делаем выборку DOM элементов
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__open-popup');
const popupSaveButtonElement = popupElement.querySelector('.popup__save');
const profileElement = document.querySelector('.profile');
let nameInput = popupElement.querySelector('.popup__input-container_name');
let jobInput = popupElement.querySelector('.popup__input-container_info');
let profileName = profileElement.querySelector('.profile__title');
let profileJob = profileElement.querySelector('.profile__subtitle');
console.log(popupOpenButtonElement);

// const togglePopupVisibility = function(){
//  popupElement.classList.toggle('popup_opened');
// }

const openPopup = function(){
    popupElement.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    console.log('Open popup clicked');
  }
const closePopup = function(){
    popupElement.classList.remove('popup_opened');
  }
const closePopupByClickOnOverlay = function(event){
  console.log(event.target, event.currentTarget);
  if (event.target !== event.currentTarget){
    return;
  }
  closePopup();
}

//togglePopupVisibility();

popupOpenButtonElement.addEventListener('click',openPopup);
popupCloseButtonElement.addEventListener('click',closePopup);
popupSaveButtonElement.addEventListener('click',closePopup);
popupElement.addEventListener('click',closePopupByClickOnOverlay);
popupElement.addEventListener('submit', handleFormSubmit);
profileElement.addEventListener('click',function(){
  console.log('Profile clicked');
})

// profileElement.addEventListener('reset', function (evt) {
//     console.log(evt)
//   })

function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
}