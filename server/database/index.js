const mongoose = require('mongoose');

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
