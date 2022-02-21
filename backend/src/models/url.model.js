import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UrlSchema = new Schema(
  {
    url: { type: String, required: true },
    shortname: { type: String, required: true, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Url', UrlSchema);
