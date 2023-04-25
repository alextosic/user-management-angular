const { defaultPermissions } = require('../../constants/permission');

module.exports = {
  async up(db, client) {
    await Promise.all(Object.values(defaultPermissions).map(async (permissionName) => {
      await db.collection('permissions').insertOne({ name: permissionName });
    }));
  },

  async down(db, client) {
    await Promise.all(Object.values(defaultPermissions).map(async (permissionName) => {
      await db.collection('permissions').deleteOne({ name: permissionName });
    }));
  },
};
