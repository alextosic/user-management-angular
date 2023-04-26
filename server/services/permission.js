const permissionRepository = require('../database/repositories/permission');

class PermissionService {
  constructor(repository) {
    this.repository = repository;
  }

  async getAll() {
    return this.repository.findAll();
  }
}

module.exports = new PermissionService(permissionRepository);
