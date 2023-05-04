const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
  password: {
    type: String,
    required: true,
  },
  passwordResetToken: {
    type: mongoose.Schema.Types.UUID,
    default: null,
  },
  immutable: {
    type: Boolean,
    default: false,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'role',
  },
  mfa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'mfa',
  },
});

module.exports = mongoose.model('user', userSchema);
