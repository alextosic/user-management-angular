const BaseRepository = require('./base');
const RoleModel = require('../models/role');

const { defaultRoles } = require('../../constants/role');

class RoleRepository extends BaseRepository {
  async findByName(name) {
    return super.findOne({ name }, null, 'permissions');
  }

  async findAll() {
    const adminRole = await this.findByName(defaultRoles.ADMIN);
    return super.find({ _id: { $ne: adminRole._id } }, null, 'permissions');
  }

  async updateById(id, data) {
    return super.updateOne({ _id: id }, data);
  }

  async deleteById(id) {
    return super.deleteOne({ _id: id });
  }
}

module.exports = new RoleRepository(RoleModel);
