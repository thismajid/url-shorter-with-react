import SendResponse from '../utils/sendResponse.util';
import {
  createUrl,
  getUrl,
  getUrlById,
  deleteSingleUrl,
  updateUrl,
  getUrlByShortname,
} from '../services/url.service';

const sendResponse = new SendResponse();

const createShortUrl = async (req, res) => {
  try {
    const { url, shortname } = req.body;
    const { userId } = req.user;
    console.log(req.body);
    const checkShortnameExist = await getUrlByShortname(shortname);
    if (checkShortnameExist)
      return sendResponse
        .setError(400, 'Duplicate shortname, please pickup another shortname')
        .send(res);
    const newUrl = await createUrl(url, shortname, userId);
    return sendResponse
      .setSuccess(201, 'New short url created successfully', newUrl)
      .send(res);
  } catch (err) {
    console.log(err);
    return sendResponse.setError(400, err.message).send(res);
  }
};

const getSingleUrl = async (req, res) => {
  try {
    const { shortname } = req.params;
    const url = await getUrl(shortname);
    if (!url)
      return sendResponse
        .setError(404, `URL with shortname: ${shortname} does not exist`)
        .send(res);
    return sendResponse
      .setSuccess(
        200,
        `URL with shortname: ${shortname} retrieved successfully`,
        url
      )
      .send(res);
  } catch (err) {
    return sendResponse.setError(400, err.message).send(res);
  }
};

const deleteUrl = async (req, res) => {
  try {
    const { id } = req.body;
    const { userId } = req.user;
    const urlFound = await getUrlById(id);
    if (!urlFound)
      return sendResponse
        .setError(404, `Url with id: ${id} does not exist`)
        .send(res);
    if (urlFound.user.toString() !== userId) {
      return sendResponse.setError(403, `Permission denied`).send(res);
    }
    await deleteSingleUrl(id);
    return sendResponse
      .setSuccess(200, `URL with id: ${id} deleted successfully`)
      .send(res);
  } catch (err) {
    console.log(err);
    return sendResponse.setError(400, err.message).send(res);
  }
};

const editUrl = async (req, res) => {
  try {
    const { id, url, shortname } = req.body;
    const { userId } = req.user;
    const urlFound = await getUrlById(id);
    if (!urlFound)
      return sendResponse
        .setError(404, `URL with id: ${id} does not exist`)
        .send(res);
    if (urlFound.user !== userId)
      return sendResponse.setError(403, `Permission denied`).send(res);
    const updateUrl = await updateUrl(id, url, shortname);
    return sendResponse
      .setSuccess(200, `URL with id: ${id} update successfully`, updateUrl)
      .send(res);
  } catch (err) {
    return sendResponse.setError(400, err.message).send(res);
  }
};

export { createShortUrl, getSingleUrl, deleteUrl, editUrl };
