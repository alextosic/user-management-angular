const BaseRepository = require('./base');
const RoleModel = require('../models/role');

class RoleRepository extends BaseRepository {
  constructor(roleModel) {
    super(roleModel);
  }

  async findByName(name) {
    return super.findOne({ name });
  }
}

module.exports = new RoleRepository(RoleModel);
