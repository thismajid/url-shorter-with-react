import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 20,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      match: /^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,4}/,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 4,
      maxlength: 20,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 50,
      match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    avatar: {
      type: String,
      default: 'uploads/user-avatar.png',
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', function (next) {
  if (this.password) {
    var salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }
  next();
});

UserSchema.pre('findOneAndUpdate', function (next) {
  if (this.password && this.getUpdate().$set) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(this.getUpdate().$set.password, salt);
    this.getUpdate().$set.password = hash;
    next();
  } else {
    next();
  }
});

UserSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    throw err;
  }
};

UserSchema.methods.toJSON = function () {
  let user = this.toObject();
  delete user.__v;
  delete user.password;
  return user;
};

module.exports = mongoose.model('User', UserSchema);
