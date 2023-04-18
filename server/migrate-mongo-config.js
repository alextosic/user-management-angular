const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  moduleSystem: 'commonjs',
  mongodb: {
    url: process.env.DATABASE_URI,
    options: {
      useNewUrlParser: true,
    },
  },
  migrationsDir: './database/migrations',
  changelogCollectionName: 'changelog',
  migrationFileExtension: '.js',
  useFileHash: false
};
