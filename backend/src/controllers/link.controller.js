import SendResponse from '../utils/sendResponse.util';
import {
  createLink,
  getLink,
  getLinkById,
  deleteSingleLink,
  updateUrl,
  getLinkByShortname,
} from '../services/link.service';

const sendResponse = new SendResponse();

const createShortLink = async (req, res) => {
  try {
    const { url, shortname } = req.body;
    const { userId } = req.user;
    const checkShortnameExist = await getLinkByShortname(shortname);
    if (checkShortnameExist)
      return sendResponse
        .setError(400, 'Duplicate shortname, please pickup another shortname')
        .send(res);
    const newLink = await createLink(url, shortname, userId);
    return sendResponse
      .setSuccess(201, 'New short url created successfully', newLink)
      .send(res);
  } catch (err) {
    return sendResponse.setError(400, err.message).send(res);
  }
};

const getSingleLink = async (req, res) => {
  try {
    const { shortname } = req.params;
    const link = await getLink(shortname);
    if (!link)
      return sendResponse
        .setError(404, `Link with shortname: ${shortname} does not exist`)
        .send(res);
    return sendResponse
      .setSuccess(
        200,
        `Link with shortname: ${shortname} retrieved successfully`,
        link
      )
      .send(res);
  } catch (err) {
    return sendResponse.setError(400, err.message).send(res);
  }
};

const deleteLink = async (req, res) => {
  try {
    const { id } = req.body;
    const { userId } = req.user;
    const linkFound = await getLinkById(id);
    if (!linkFound)
      return sendResponse
        .setError(404, `Link with id: ${id} does not exist`)
        .send(res);
    if (linkFound.user !== userId)
      return sendResponse.setError(403, `Permission denied`).send(res);
    await deleteSingleLink(id);
    return sendResponse
      .setSuccess(200, `Link with id: ${id} deleted successfully`)
      .send(res);
  } catch (err) {
    return sendResponse.setError(400, err.message).send(res);
  }
};

const updateLink = async (req, res) => {
  try {
    const { id, url, shortname } = req.body;
    const { userId } = req.user;
    const linkFound = await getLinkById(id);
    if (!linkFound)
      return sendResponse
        .setError(404, `Link with id: ${id} does not exist`)
        .send(res);
    if (linkFound.user !== userId)
      return sendResponse.setError(403, `Permission denied`).send(res);
    const updateLink = await updateUrl(id, url, shortname);
    return sendResponse
      .setSuccess(200, `Link with id: ${id} update successfully`, updateLink)
      .send(res);
  } catch (err) {
    return sendResponse.setError(400, err.message).send(res);
  }
};

export { createShortLink, getSingleLink, deleteLink, updateLink };
