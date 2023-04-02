export default class UserInfo{
  constructor({profileName, profileJob,profileAvatarElement}){
    this._name = profileName;
    this._info = profileJob;
    this._avatar = profileAvatarElement;
  }

  getUserInfo(){
    return{
    name: this._name.textContent,
    subtitle: this._info.textContent
    };
  }

  getAvaInfo(){
    return {
      avatar: this._avatar.src}
  }

  setUserInfo({name,subtitle}){
    this._name.textContent = name;
    this._info.textContent = subtitle
  }

  setAvaInfo({avatar}){
    this._avatar = avatar
  }

  //Сохраняет полученную информацию о пользователе
//  fill({name, about, avatar, cohort, _id}) {
//    this._name = name;
//    this._job = about;
//    this._avatar = avatar;
//    this._cohort = cohort;
//    this.id = _id;
//  }
 
  renderAvatar() {
    this._avatarElement.src = this._avatar;
  }
}