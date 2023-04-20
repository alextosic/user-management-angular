class ProfileDTO {
  constructor({ _id, email, firstName, lastName, role: { name: roleName } }) {
    this.id = _id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = roleName;
  }

  toJson() {
    return {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      role: this.role,
    };
  }
}

module.exports = ProfileDTO;
