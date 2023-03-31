export default class Api {
  constructor({headers, baseUrl}) {
    this.headers = headers;
    this.baseUrl = baseUrl
  }

  getInitialCards() {
    // ...
  }
 getUserInfo(){
  return fetch(`${this.baseUrl}/users/me`, {
  headers: this.headers
})
  // .then(res => res.json())  
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