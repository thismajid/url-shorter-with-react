import User from '../models/user.model';
import Reset from '../models/reset.model';

const findUsername = async (username) => {
  try {
    return await User.findOne({ username });
  } catch (err) {
    throw err;
  }
};

const findEmail = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (err) {
    throw err;
  }
};

const createUser = async (newUser) => {
  try {
    return await User.create(newUser);
  } catch (err) {
    throw err;
  }
};

const authenticateUser = async (username, password) => {
  try {
    const user = await findUsername(username);
    return await user.comparePassword(password);
  } catch (err) {
    throw err;
  }
};

const randomString = () => {
  const first_section = Date.now().toString(36);
  const second_section = Math.random().toString(36).substring(2);
  return first_section.concat(second_section);
};

const createNewResetPassword = async (email) => {
  try {
    return await Reset.create({ token: randomString(), email });
  } catch (err) {
    throw err;
  }
};

const findToken = async (token) => {
  try {
    return await Reset.findOne({ token });
  } catch (err) {
    throw err;
  }
};

const updatePassword = async (id, password) => {
  try {
    return await User.findByIdAndUpdate(id, { password });
  } catch (err) {
    throw err;
  }
};

const expireToken = async (id) => {
  try {
    return await Reset.findByIdAndUpdate(id, { isUsed: true });
  } catch (err) {
    throw err;
  }
};

export {
  findUsername,
  findEmail,
  createUser,
  authenticateUser,
  createNewResetPassword,
  findToken,
  updatePassword,
  expireToken,
};
