const BaseRepository = require('./base');
const PermissionModel = require('../models/permission');

class PermissionRepository extends BaseRepository {
  async findAll() {
    return this.model.find({});
  }
}

module.exports = new PermissionRepository(PermissionModel);
