const BaseRepository = require('./base');
const RoleModel = require('../models/role');

const { defaultRoles } = require('../../constants/role');

class RoleRepository extends BaseRepository {
  async findById(id) {
    return super.findOne({ _id: id }, null, 'permissions');
  }

  async findByName(name) {
    return super.findOne({ name }, null, 'permissions');
  }

  async findAll(pagination) {
    const { page = 0, perPage = 0 } = pagination;
    const adminRole = await this.findByName(defaultRoles.ADMIN);

    return super.find(
      { _id: { $ne: adminRole._id } },
      { skip: page * perPage, limit: perPage },
      'permissions',
    );
  }

  async countAll() {
    const adminRole = await this.findByName(defaultRoles.ADMIN);
    return super.count({ role: { $ne: adminRole._id } });
  }

  async updateById(id, data) {
    return super.updateOne({ _id: id }, data);
  }

  async deleteById(id) {
    return super.deleteOne({ _id: id });
  }
}

module.exports = new RoleRepository(RoleModel);
