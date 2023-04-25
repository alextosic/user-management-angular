class ProfileDTO {
  constructor({ email, firstName, lastName, role }) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.permissions = role.permissions.map((permission) => permission.name);
  }

  toJson() {
    return {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      permissions: this.permissions,
    };
  }
}

module.exports = ProfileDTO;
