

// //***********   ДОБАВЛЯЕТ И УДАЛЯЕТ КЛАСС С ОШИБКОЙ
// const showInputError = (formElement, inputElement, errorMessage, options) => {
//   inputElement.classList.add(options.inputErrorClass);
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(options.errorClass);
// };

// const hideInputError = (formElement, inputElement, options) => {
//   inputElement.classList.remove(options.inputErrorClass);
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   errorElement.classList.remove(options.errorClass);
//   errorElement.textContent = '';
// };

// //***********   ПРОВЕРЯЕТ ВАЛИДНОСТЬ ПОЛЯ
// const checkInputValidity = (formElement,inputElement,options) => {
//   if(!inputElement.validity.valid){
//     showInputError(formElement, inputElement, inputElement.validationMessage,options);
//   }
//   else{
//     hideInputError(formElement, inputElement,options);
//   };
// };

// //***********   ОТКЛЮЧАЕТ И ВКЛЮЧАЕТ КНОПКУ
// const toggleButtonState = (inputList, buttonElement, options) => {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add(options.inactiveButtonClass);
//     buttonElement.setAttribute("disabled","");
//   } else {
//     buttonElement.classList.remove(options.inactiveButtonClass);
//     buttonElement.removeAttribute("disabled");
//   }
// };

// //***********    ДОБАВЛЯЕТ ОБРАБОТЧИКИ ВСЕМ ПОЛЯМ ФОРМЫ
// const setEventListeners = (formElement, options) => {
//   // Находим все поля внутри формы,
//   // сделаем из них массив методом Array.from
//   const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
//   const buttonElement = formElement.querySelector(options.submitButtonSelector);
//   toggleButtonState(inputList, buttonElement, options);
//   // Обойдём все элементы полученной коллекции
//   inputList.forEach((inputElement) => {
//     // каждому полю добавим обработчик события input
//     inputElement.addEventListener('input', () => {
//       // Внутри колбэка вызовем checkInputValidity,
//       // передав ей форму и проверяемый элемент
//       checkInputValidity(formElement, inputElement,options);
//       toggleButtonState(inputList, buttonElement, options);
//     });
//   });
// }; 

// //***********    ПРОВЕРЯЕТ НАЛИЧИЕ НЕВАЛИДНОГО ПОЛЯ
// const hasInvalidInput = (inputList) => {
//   // проходим по этому массиву методом some
//   return inputList.some((inputElement) => {
//     // Если поле не валидно, колбэк вернёт true
//     // Обход массива прекратится и вся функция
//     // hasInvalidInput вернёт true
//     return !inputElement.validity.valid;
//   })
// };


// //************   ДОБАВЛЕНИЕ ОБРАБОТЧИКОВ ВСЕМ ФОРМАМ
// const enableValidation = (options) => {
//   const formList = Array.from(document.querySelectorAll(options.formSelector));
//   formList.forEach((formElement) => {
//     setEventListeners(formElement, options);
//     });
//   };

// const options = {
//   formSelector: '.popup__container',
//   inputSelector: '.popup__input-container',
//   submitButtonSelector: '.popup__save',
//   inactiveButtonClass: 'popup__save-add_disabled',
//   inputErrorClass: 'popup__input-container_type_error',
//   errorClass: 'popup__input-container-error_active'
// }

  // enableValidation(options);

