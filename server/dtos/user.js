class UserDTO {
  constructor({ _id, email, firstName, lastName, immutable, role }) {
    this.id = _id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.immutable = immutable;

    this.role = {
      id: role._id,
      name: role.name,
      permissions: role.permissions.map((permission) => ({
        id: permission._id,
        name: permission.name,
      })),
    };
  }

  toJson() {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      immutable: this.immutable,
      role: this.role,
    };
  }

  static fromArray(userArray) {
    return userArray.map((user) => new UserDTO(user).toJson());
  }
}

module.exports = UserDTO;
