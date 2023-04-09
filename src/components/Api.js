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

//********Загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers,
    })
    .then(this._checkResponse);
  }

  //********Информация о пользователе с сервера */
  getUserInfo(){
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

   //********Редактирование профиля */
  setUserInfo(data){
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({name:data.name,
        about:data.subtitle})
      })
      .then(this._checkResponse);
    };

    changeAvatar(avatar) {
      return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(avatar)
        })
        .then(this._checkResponse);
      };

  addNewCard(data){
      return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({name: data.title,link: data.way})
      })
      .then(this._checkResponse);
    };

    deleteCard(cardId){
      return fetch(`${this._url}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers,
      })
      .then(this._checkResponse);
    }

    //********Постановка лайка */
    addLike(cardId){
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers,
      })
      .then(this._checkResponse);
    }

    //********Снятие лайка */
    deleteLike(cardId){
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers,
      })
      .then(this._checkResponse);
    }

  
  }

