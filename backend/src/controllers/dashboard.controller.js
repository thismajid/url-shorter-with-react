import SendResponse from '../utils/sendResponse.util';
import { getUrlsByUserId } from '../services/url.service';
import { getUserByUserId, updateUser } from '../services/user.service';

const sendResponse = new SendResponse();

const getUrls = async (req, res) => {
  try {
    const { userId } = req.user;
    const urls = await getUrlsByUserId(userId);
    return sendResponse
      .setSuccess(200, 'All your urls retrieved successfully', urls)
      .send(res);
  } catch (err) {
    sendResponse.setError(400, err.message).send(res);
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
    sendResponse.setError(400, err.message).send(res);
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
    sendResponse.setError(400, err.message).send(res);
  }
};

export { getUrls, getUser, updateProfile };
