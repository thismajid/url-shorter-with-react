import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ResetSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isUsed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Reset', ResetSchema);
