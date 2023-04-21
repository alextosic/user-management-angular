const BaseRepository = require('./base');
const UserModel = require('../models/user');

class UserRepository extends BaseRepository {
  constructor(userModel) {
    super(userModel);
  }

  async findAllNotAdmin(adminRoleId, pagination) {
    const { page = 0, perPage = 0 } = pagination;
    return super.find({ role: { $ne: adminRoleId } }, { skip: page * perPage, limit: perPage }, 'role');
  }

  async countAllNotAdmin(adminRoleId) {
    return super.count({ role: { $ne: adminRoleId } });
  }

  async findById(id) {
    return super.findOne({ _id: id }, null, 'role');
  }

  async findByEmail(email) {
    return super.findOne({ email }, null, 'role');
  }

  async updateById(id, data) {
    return super.updateOne({ _id: id }, data);
  }

  async deleteById(id) {
    return super.deleteOne({ _id: id });
  }
}

module.exports = new UserRepository(UserModel);
