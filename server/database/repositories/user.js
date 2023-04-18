const BaseRepository = require('./base');
const UserModel = require('../models/user');

class UserRepository extends BaseRepository {
  constructor(userModel) {
    super(userModel);
  }

  async findAllNotAdmin(adminRoleId) {
    return super.find({ role: { $ne: adminRoleId } }, null, 'role');
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
