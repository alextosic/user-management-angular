class RoleDTO {
  constructor({ _id, name, immutable, permissions }) {
    this.id = _id;
    this.name = name;
    this.immutable = immutable;
    this.permissions = permissions;
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      immutable: this.immutable,
      permissions: this.permissions,
    };
  }

  static fromArray(roleArray) {
    return roleArray.map((role) => new RoleDTO(role).toJson());
  }
}

module.exports = RoleDTO;
