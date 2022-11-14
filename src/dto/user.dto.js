export default class UserDTO {
  constructor({ username, _id, password }) {
    this.username = username;
    this.id = _id.toString();
    this.password = password;
  }
}