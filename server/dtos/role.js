class RoleDTO {
  constructor({ _id, name, permissions }) {
    this.id = _id;
    this.name = name;
    this.permissions = permissions;
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      permissions: this.permissions,
    };
  }

  static fromArray(roleArray) {
    return roleArray.map((role) => new RoleDTO(role).toJson());
  }
}

module.exports = RoleDTO;
