import SendResponse from '../utils/sendResponse.util';
import { getAllUsersUrls, deleteUrlsByUserId } from '../services/url.service';
import {
  getUsers,
  changeRole,
  getUserByUserId,
  removeUser,
  deleteAvatar,
} from '../services/user.service';

const sendResponse = new SendResponse();

const getAllUrls = async (req, res) => {
  try {
    const urls = await getAllUsersUrls();
    return sendResponse
      .setSuccess(200, 'All urls retrieved successfully', urls)
      .send(res);
  } catch (err) {
    return sendResponse.setError(400, err.message).send(res);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await getUsers();
    return sendResponse
      .setSuccess(200, 'All users retrieved successfully', users)
      .send(res);
  } catch (err) {
    return sendResponse.setError(400, err.message).send(res);
  }
};

const changeUserRole = async (req, res) => {
  try {
    const { userId } = req.body;
    await changeRole(userId);
    return sendResponse
      .setSuccess(200, `User's role updated successfully`)
      .send(res);
  } catch (err) {
    return sendResponse.setError(400, err.message).send(res);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await getUserByUserId(userId);
    if (!user) {
      return sendResponse.setError(404, 'Invalid userId').send(res);
    }
    await removeUser(userId);
    if (user.avatar !== 'uploads/user-avatar.png') {
      await deleteAvatar(user.avatar);
    }
    await deleteUrlsByUserId(userId);
    return sendResponse
      .setSuccess(200, `User with id: ${userId} deleted successfully`)
      .send(res);
  } catch (err) {
    return sendResponse.setError(400, err.message).send(res);
  }
};

export { getAllUrls, getAllUsers, changeUserRole, deleteUser };
