const BaseRepository = require('./base');
const MfaModel = require('../models/mfa');

class MfaRepository extends BaseRepository {
  async updateById(id, data) {
    return super.updateOne({ _id: id }, data);
  }

  async findByUserId(userId) {
    return super.find({ user: userId });
  }
}

module.exports = new MfaRepository(MfaModel);
