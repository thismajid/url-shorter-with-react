import SendResponse from '../utils/sendResponse.util';
import { getAllUsersUrls } from '../services/url.service';

const sendResponse = new SendResponse();

const getAllUrls = async (req, res) => {
  try {
    const urls = await getAllUsersUrls();
    return sendResponse
      .setSuccess(200, 'All your urls retrieved successfully', urls)
      .send(res);
  } catch (err) {
    return sendResponse.setError(400, err.message).send(res);
  }
};

export { getAllUrls };
