class ProfileDTO {
  constructor({ email, firstName, lastName, role, mfa }) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.permissions = role.permissions.map((permission) => permission.name);
    this.mfa = mfa ? {
      id: mfa._id,
      type: mfa.type,
      verified: mfa.verified,
      uri: mfa.uri,
    } : null;
  }

  toJson() {
    return {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      permissions: this.permissions,
      mfa: this.mfa,
    };
  }
}

module.exports = ProfileDTO;
