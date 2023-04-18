class UserDTO {
  constructor({ _id, email, firstName, lastName, role }) {
    this.id = _id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
  }

  toJson() {
    return {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      role: this.role,
    };
  }

  static fromArray(userArray) {
    return userArray.map(user => new UserDTO(user).toJson());
  }
}

module.exports = UserDTO;
