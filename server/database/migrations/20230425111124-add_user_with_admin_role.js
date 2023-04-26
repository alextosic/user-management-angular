const dotenv = require('dotenv');

const authService = require('../../services/auth');
const { defaultRoles } = require('../../constants/role');

dotenv.config();

module.exports = {
  async up(db, client) {
    const adminRole = await db.collection('roles').findOne({ name: defaultRoles.ADMIN });

    await db.collection('users').insertOne({
      email: 'admin@cyrillicsoftware.net',
      password: await authService.hashPassword(process.env.ADMIN_PASSWORD),
      firstName: 'Admin',
      lastName: 'Admin',
      passwordResetToken: null,
      immutable: true,
      role: adminRole._id,
    });
  },

  async down(db, client) {
    await db.collection('users').deleteOne({ email: 'admin@cyrillicsoftware.net' });
  },
};
