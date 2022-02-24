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

const changeAvatar = async (userId, avatar) => {
  try {
    return await User.findByIdAndUpdate(userId, {
      avatar: `uploads/avatars/${avatar}`,
    });
  } catch (err) {
    throw err;
  }
};

const changeAvatarToDefault = async (userId) => {
  try {
    return await User.findByIdAndUpdate(userId, {
      avatar: `uploads/user-avatar.png`,
    });
  } catch (err) {
    throw err;
  }
};

export { getUserByUserId, updateUser, changeAvatar, changeAvatarToDefault };
