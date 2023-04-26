const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  immutable: {
    type: Boolean,
    default: false,
  },
  permissions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'permission',
    },
  ],
});

module.exports = mongoose.model('role', roleSchema);
