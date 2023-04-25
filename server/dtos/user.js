class UserDTO {
  constructor({ _id, email, firstName, lastName, role }) {
    this.id = _id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = { id: role._id, name: role.name };
  }

  toJson() {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      role: this.role,
    };
  }

  static fromArray(userArray) {
    return userArray.map((user) => new UserDTO(user).toJson());
  }
}

module.exports = UserDTO;
