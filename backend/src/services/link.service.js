import Link from '../models/link.model';

const randomString = () => {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  for (let index = 0; index < 10; index++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

const createLink = async (url, id) => {
  try {
    return await Link.create({
      url,
      shortname: randomString(),
      user: id,
    });
  } catch (err) {
    throw err;
  }
};

const getLink = async (shortname) => {
  try {
    return await Link.findOne({ shortname });
  } catch (err) {
    throw err;
  }
};

const getLinkById = async (id) => {
  try {
    return await Link.findById(id);
  } catch (err) {
    throw err;
  }
};

const deleteSingleLink = async (id) => {
  try {
    return await Link.deleteOne({ _id: id });
  } catch (err) {
    throw err;
  }
};

export { createLink, getLink, deleteSingleLink, getLinkById };
