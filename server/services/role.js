const roleRepository = require('../database/repositories/role');
const ErrorResponse = require('../responses/error');

class RoleService {
  constructor(repository) {
    this.repository = repository;
  }

  async getById(id) {
    return this.repository.findById(id);
  }

  async getByName(name) {
    const role = await this.repository.findByName(name);

    if (!role) {
      throw new ErrorResponse('service', 400, 'Role with that name doesn\'t exist.');
    }

    return role;
  }

  async getAll(pagination) {
    const roles = await this.repository.findAll(pagination);
    const total = await this.repository.countAll();

    return {
      roles,
      total,
    };
  }

  async create(data) {
    const { name, permissions } = data;
    const role = await this.repository.findByName(name);

    if (role) {
      throw new ErrorResponse('service', 409, 'Role with that name already exists.');
    }

    return this.repository.create({ name, permissions });
  }

  async update(id, data) {
    const role = await this.getById(id);

    if (!role) {
      throw new ErrorResponse('service', 400, 'Role with that ID doesn\'t exist.');
    }

    const { name, permissions } = data;
    await this.repository.updateById(id, { name, permissions });

    return this.getById(id);
  }

  async delete(id) {
    const role = await this.getById(id);

    if (!role) {
      throw new ErrorResponse('service', 400, 'Role with that ID doesn\'t exist.');
    }

    return this.repository.deleteById(id);
  }
}

module.exports = new RoleService(roleRepository);
