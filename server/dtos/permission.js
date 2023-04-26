class PermissionDTO {
  constructor({ _id, name }) {
    this.id = _id;
    this.name = name;
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
    };
  }

  static fromArray(permissionArray) {
    return permissionArray.map((permission) => new PermissionDTO(permission).toJson());
  }
}

module.exports = PermissionDTO;
