export class FormValidator {
  constructor(options, formElement) {
    this._formSelector = options.formSelector;
    this._inputSelector = options.inputSelector;
    this._submitButtonSelector = options.submitButtonSelector;
    this._inactiveButtonClass = options.inactiveButtonClass;
    this._inputErrorClass = options.inputErrorClass;
    this._errorClass = options.errorClass;
    this._formElement = formElement;
  }

  //***********   ДОБАВЛЯЕТ И УДАЛЯЕТ КЛАСС С ОШИБКОЙ
  _showInputError = (inputElement, errorMessage) => {
    inputElement.classList.add(this._inputErrorClass);
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (inputElement) => {
    inputElement.classList.remove(this._inputErrorClass);
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  };

  //***********   ПРОВЕРЯЕТ ВАЛИДНОСТЬ ПОЛЯ
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //***********    ДОБАВЛЯЕТ ОБРАБОТЧИКИ ВСЕМ ПОЛЯМ ФОРМЫ
  _setEventListeners = () => {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    this.inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._toggleButtonState();
    // Обойдём все элементы полученной коллекции
    this.inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener("input", () => {
        // Внутри колбэка вызовем checkInputValidity,
        // передав ей форму и проверяемый элемент
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  //***********   ОТКЛЮЧАЕТ И ВКЛЮЧАЕТ КНОПКУ
  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute("disabled", "");
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");
    }
  };

  disableSubmitButton = () => {
    this._toggleButtonState();
  };

  //***********    ПРОВЕРЯЕТ НАЛИЧИЕ НЕВАЛИДНОГО ПОЛЯ
  _hasInvalidInput = () => {
    // проходим по этому массиву методом some
    return this.inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
      return !inputElement.validity.valid;
    });
  };

  //************   ДОБАВЛЕНИЕ ОБРАБОТЧИКОВ ВСЕМ ФОРМАМ
  enableValidation() {
    this._setEventListeners();
  }
}
