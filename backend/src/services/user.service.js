import fs from 'fs';
import path from 'path';

import User from '../models/user.model';

const fsPromises = fs.promises;

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

const getUsers = async () => {
  try {
    return await User.find({});
  } catch (err) {
    throw err;
  }
};

const changeRole = async (id) => {
  try {
    return await User.findByIdAndUpdate(id, { role: 'admin' });
  } catch (err) {
    throw err;
  }
};

const removeUser = async (userId) => {
  try {
    return await User.findByIdAndDelete(userId);
  } catch (err) {
    throw err;
  }
};

const deleteAvatar = async (address) => {
  try {
    return await fsPromises.unlink(
      path.join(__dirname, `../../public/${address}`)
    );
  } catch (err) {
    throw err;
  }
};

export {
  getUserByUserId,
  updateUser,
  changeAvatar,
  changeAvatarToDefault,
  getUsers,
  changeRole,
  removeUser,
  deleteAvatar,
};
