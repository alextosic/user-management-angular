const mongoose = require('mongoose');

const mfaSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  factorSid: {
    type: String,
    required: true,
  },
  uri: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

module.exports = mongoose.model('mfa', mfaSchema);
