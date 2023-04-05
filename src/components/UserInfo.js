export default class UserInfo{
  constructor({name, subtitle,avatar}){
    this._name = name;
    this._info = subtitle;
    this._avatar = avatar;
    this._userId = '';
  }

  getUserInfo(){
    return{
    name: this._name.textContent,
    subtitle: this._info.textContent,
    avatar: this._avatar.src,
    userId: this._userId,
    };
  }

  setUserInfo({name,about,avatar}){
    this._name.textContent = name;
    this._info.textContent = about;
    this._avatar.src = avatar;
    // this._userId = _id;
  }

  // setAvaInfo({avatar}){
  //   this._avatar.src = avatar;
  // }
}