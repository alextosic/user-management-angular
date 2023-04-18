const roleRepository = require('../database/repositories/role');

class RoleService {
  constructor(repository) {
    this.repository = repository;
  }

  async getByName(name) {
    return this.repository.findByName(name);
  }
}

module.exports = new RoleService(roleRepository);
