const { defaultRoles } = require('../../constants/role');

module.exports = {
  async up(db, client) {
    const permissions = await db.collection('permissions').find({}).toArray();

    await Promise.all(Object.values(defaultRoles).map(async (roleName) => {
      const rolePermissions = roleName === defaultRoles.ADMIN
        ? permissions.map((permission) => permission._id)
        : [];

      await db.collection('roles').insertOne({ name: roleName, permissions: rolePermissions });
    }));
  },

  async down(db, client) {
    await Promise.all(Object.values(defaultRoles).map(async (roleName) => {
      await db.collection('roles').deleteOne({ name: roleName });
    }));
  },
};
