const { defaultRoles } = require('../../constants/role');

module.exports = {
  async up(db, client) {
    await Promise.all(Object.values(defaultRoles).map(async (roleName) => {
      await db.collection('roles').insertOne({ name: roleName });
    }))
  },

  async down(db, client) {
    await Promise.all(Object.values(defaultRoles).map(async (roleName) => {
      await db.collection('roles').deleteOne({ name: roleName });
    }))
  }
};
