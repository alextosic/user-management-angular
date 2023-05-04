const BaseRepository = require('./base');
const MfaModel = require('../models/mfa');

class MfaRepository extends BaseRepository {
  async findById(id) {
    return super.findOne({ _id: id });
  }

  async findByUserId(userId) {
    return super.findOne({ user: userId });
  }

  async updateById(id, data) {
    return super.updateOne({ _id: id }, data);
  }

  async deleteById(id) {
    return super.deleteOne({ _id: id });
  }
}

module.exports = new MfaRepository(MfaModel);
