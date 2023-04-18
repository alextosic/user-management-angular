class UserDTO {
  constructor({ _id, email, firstName, lastName }) {
    this.id = _id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  toJson() {
    return {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
    };
  }

  static fromArray(userArray) {
    return userArray.map(user => new UserDTO(user).toJson());
  }
}

module.exports = UserDTO;
