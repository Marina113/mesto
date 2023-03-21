export default class UserInfo{
  constructor({profileName, profileJob}){
    this._name = profileName;
    this._info = profileJob;
  }

  getUserInfo(){
    return{
    name: this._name.textContent,
    subtitle: this._info.textContent
    };
  }

  setUserInfo({name,subtitle}){
    this._name.textContent = name;
    this._info.textContent = subtitle;
  };
  
}