class ProfileDTO {
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
}

module.exports = ProfileDTO;
