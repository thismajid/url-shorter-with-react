import User from '../models/user.model';

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

export { findUsername, findEmail, createUser, authenticateUser };
