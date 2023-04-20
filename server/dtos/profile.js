class ProfileDTO {
  constructor({ _id, email, firstName, lastName, role }) {
    this.id = _id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role?.name;
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
