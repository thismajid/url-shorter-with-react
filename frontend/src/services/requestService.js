import http from "./httpService";

const registerReq = async (user) => {
  try {
    return await http.post("/auth/register", user);
  } catch (err) {
    throw err;
  }
};

const loginReq = async (user) => {
  try {
    return await http.post("/auth/login", user);
  } catch (err) {
    throw err;
  }
};

const addUrl = async (url) => {
  try {
    return await http.post("/url", url);
  } catch (err) {
    throw err;
  }
};

const getUrl = async (shortname) => {
  try {
    return await http.get(`/url/${shortname}`);
  } catch (err) {
    throw err;
  }
};

export { registerReq, loginReq, addUrl, getUrl };
