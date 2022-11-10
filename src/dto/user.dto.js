export default class UserDTO {
  constructor({ username, _id, password }) {
    this.username = username;
    this.id = _id;
    this.password = password;
  }
}