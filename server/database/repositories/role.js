const BaseRepository = require('./base');
const RoleModel = require('../models/role');

class RoleRepository extends BaseRepository {
  async findById(id) {
    return super.findOne({ _id: id }, null, 'permissions');
  }

  async findByName(name) {
    return super.findOne({ name }, null, 'permissions');
  }

  async findAll(pagination) {
    const { page = 0, perPage = 0 } = pagination;

    return super.find(
      {},
      { skip: page * perPage, limit: perPage },
      'permissions',
    );
  }

  async countAll() {
    return super.count({});
  }

  async updateById(id, data) {
    return super.updateOne({ _id: id }, data);
  }

  async deleteById(id) {
    return super.deleteOne({ _id: id });
  }
}

module.exports = new RoleRepository(RoleModel);
