const roleRepository = require('../database/repositories/role');
const ErrorResponse = require('../responses/error');

class RoleService {
  constructor(repository) {
    this.repository = repository;
  }

  async getByName(name) {
    const role = await this.repository.findByName(name);

    if (!role) {
      throw new ErrorResponse('service', 400, 'Role with that name doesn\'t exist.');
    }

    return role;
  }
}

module.exports = new RoleService(roleRepository);
