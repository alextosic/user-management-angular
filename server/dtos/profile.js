class ProfileDTO {
  constructor({ email, firstName, lastName, role }) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;

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
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      role: this.role,
    };
  }
}

module.exports = ProfileDTO;
