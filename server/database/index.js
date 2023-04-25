const mongoose = require('mongoose');

require('./models/user');
require('./models/role');
require('./models/permission');

const connect = () => {
  mongoose.connect(process.env.DATABASE_URI)
    .then(() => {
      console.log('Connected to database');
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  connect,
};
