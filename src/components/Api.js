export default class Api {
  constructor(options) {
    // тело конструктора
  }

  getInitialCards() {
    // ...
  }

  // другие методы работы с API
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: '4c8fe4ba-ddf5-4cbd-b158-fff86875ab55',
    'Content-Type': 'application/json'
  }
}); 