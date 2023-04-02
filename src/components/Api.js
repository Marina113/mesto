export default class Api {
  constructor({headers, url}) {
    this._headers = headers;
    this._url = url
  }

_checkResponse(res){
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}


  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers,
    })
    .then(this._checkResponse);
  }

  getUserInfo(){
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

   //***** Редактирование профиля */
  setUserInfo({name,subtitle}){
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about: subtitle
      })
      })
      .then(this._checkResponse);
    };

    changeAvatar(avatar) {
      return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: avatar
        })
        })
        .then(this._checkResponse);
      };

  addNewCard({item}){
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        link: item.link
      })
      })
      .then(this._checkResponse);
    };

    deleteCard(){
      return fetch(`${this._url}/cards/cardId`, {
        method: 'DELETE',
        headers: this._headers,
      })
      .then(this._checkResponse);
    }

    addLike(){
      return fetch(`${this._url}/cards/cardId/likes`, {
        method: 'PUT',
        headers: this._headers,
      })
      .then(this._checkResponse);
    }

    deleteLike(){
      return fetch(`${this._url}/cards/cardId/likes`, {
        method: 'DELETE',
        headers: this._headers,
      })
      .then(this._checkResponse);
    }

  
  }

