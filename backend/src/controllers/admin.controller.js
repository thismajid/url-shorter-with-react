import SendResponse from '../utils/sendResponse.util';
import { getAllUsersUrls } from '../services/url.service';
import { getUsers } from '../services/user.service';

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

export { getAllUrls, getAllUsers };
