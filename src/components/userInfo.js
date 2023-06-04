export default class UserInfo {
  constructor(userInfo) {
    this._name = userInfo.name;
    this._about = userInfo.about;
    this._avatar = userInfo.avatar;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
    };
  }

  setUserInfo(userData) {
    this._name.textContent = userData.name;
    this._about.textContent = userData.about;
    this._avatar.src = userData.avatar;
    this._userId = userData.userId;
  }

  newUserInfo({ name, about }) {
    this._name.textContent = name;
    this._about.textContent = about;
  }

  setUserAvatar({ newUserAvatar }) {
    this._avatar.src = newUserAvatar;
  }

  getUserId() {
    return this._userId;
  }
}
