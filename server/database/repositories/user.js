const BaseRepository = require('./base');
const UserModel = require('../models/user');

class UserRepository extends BaseRepository {
  async findAll(adminRoleId, pagination) {
    const { page = 0, perPage = 0 } = pagination;

    return super.find(
      { role: { $ne: adminRoleId } },
      { skip: page * perPage, limit: perPage },
      { path: 'role', populate: { path: 'permissions' } },
    );
  }

  async countAll(adminRoleId) {
    return super.count({ role: { $ne: adminRoleId } });
  }

  async findById(id) {
    return super.findOne({ _id: id }, null, { path: 'role', populate: { path: 'permissions' } });
  }

  async findByEmail(email) {
    return super.findOne({ email }, null, { path: 'role', populate: { path: 'permissions' } });
  }

  async updateById(id, data) {
    return super.updateOne({ _id: id }, data);
  }

  async deleteById(id) {
    return super.deleteOne({ _id: id });
  }
}

module.exports = new UserRepository(UserModel);
