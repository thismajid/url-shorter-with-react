import User from '../models/user.model';

const getUserByUserId = async (userId) => {
  try {
    return await User.findById(userId);
  } catch (err) {
    throw err;
  }
};

const updateUser = async (userId, updateItems) => {
  try {
    return await User.findByIdAndUpdate(userId, updateItems, {
      new: true,
    });
  } catch (err) {
    throw err;
  }
};

export { getUserByUserId, updateUser };
