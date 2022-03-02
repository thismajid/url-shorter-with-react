import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

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

UrlSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Url', UrlSchema);
