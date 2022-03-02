import SendResponse from '../utils/sendResponse.util';
import { getUrlsByUserId } from '../services/url.service';
import {
  getUserByUserId,
  updateUser,
  changeAvatar,
  changeAvatarToDefault,
  deleteAvatar,
} from '../services/user.service';
import { createNewResetPassword } from '../services/auth.service';
import EmailService from '../services/email.service';

const sendResponse = new SendResponse();
const emailService = new EmailService();

const getUrls = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const { userId } = req.user;
    const urls = await getUrlsByUserId(page, limit, userId);
    return sendResponse
      .setSuccess(200, 'All your urls retrieved successfully', urls)
      .send(res);
  } catch (err) {
    return sendResponse.setError(400, err.message).send(res);
  }
};

const getUser = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await getUserByUserId(userId);
    return sendResponse
      .setSuccess(200, `User with id: ${userId} retrieved successfully`, user)
      .send(res);
  } catch (err) {
    return sendResponse.setError(400, err.message).send(res);
  }
};

const updateProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    const { firstname, lastname } = req.body;
    const updatedUser = await updateUser(userId, { firstname, lastname });
    return sendResponse
      .setSuccess(
        200,
        `User with id: ${userId} updated successfully`,
        updatedUser
      )
      .send(res);
  } catch (err) {
    return sendResponse.setError(400, err.message).send(res);
  }
};

const uploadAvatar = async (req, res) => {
  try {
    const { userId } = req.user;
    const { filename } = req.file;
    await changeAvatar(userId, filename);
    return sendResponse
      .setSuccess(200, `User with id: ${userId} avatar updated successfully`)
      .send(res);
  } catch (err) {
    return sendResponse.setError(400, err.message).send(res);
  }
};

const removeAvatar = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await getUserByUserId(userId);
    if (!user) {
      return sendResponse
        .setSuccess(404, `User with id: ${userId} not found`)
        .send(res);
    }
    await changeAvatarToDefault(userId);
    if (user.avatar !== 'uploads/user-avatar.png') {
      await deleteAvatar(user.avatar);
    }
    return sendResponse
      .setSuccess(200, `User with id: ${userId} avatar removed successfully`)
      .send(res);
  } catch (err) {
    return sendResponse.setError(400, err.message).send(res);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await getUserByUserId(userId);
    if (!user) {
      return sendResponse
        .setSuccess(404, `User with id: ${userId} not found`)
        .send(res);
    }
    const { token } = await createNewResetPassword(user.email);
    await emailService.sendEmail(user.email, user.firstname, token);
    return sendResponse
      .setSuccess(200, 'Email with reset password link has been sent')
      .send(res);
  } catch (err) {
    return sendResponse.setError(400, err.message).send(res);
  }
};

export {
  getUrls,
  getUser,
  updateProfile,
  uploadAvatar,
  removeAvatar,
  resetPassword,
};
