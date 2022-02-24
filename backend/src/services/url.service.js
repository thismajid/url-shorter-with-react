import Url from '../models/url.model';

const randomString = () => {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  for (let index = 0; index < 10; index++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

const createUrl = async (url, shortname, userId = null) => {
  try {
    return await Url.create({
      url,
      shortname: shortname ? shortname : randomString(),
      user: userId,
    });
  } catch (err) {
    throw err;
  }
};

const getUrl = async (shortname) => {
  try {
    return await Url.findOne({ shortname });
  } catch (err) {
    throw err;
  }
};

const getUrlById = async (id) => {
  try {
    return await Url.findById(id);
  } catch (err) {
    throw err;
  }
};

const deleteSingleUrl = async (id) => {
  try {
    return await Url.deleteOne({ _id: id });
  } catch (err) {
    throw err;
  }
};

const updateUrl = async (id, url, shortname) => {
  try {
    return await Url.findByIdAndUpdate(id, { url, shortname }, { new: true });
  } catch (err) {
    throw err;
  }
};

const getUrlByShortname = async (shortname) => {
  try {
    return await Url.findOne({ shortname });
  } catch (err) {
    throw err;
  }
};

const getUrlsByUserId = async (userId) => {
  try {
    return await Url.find({ user: userId });
  } catch (err) {
    throw err;
  }
};

export {
  createUrl,
  getUrl,
  deleteSingleUrl,
  getUrlById,
  updateUrl,
  getUrlByShortname,
  getUrlsByUserId,
};
