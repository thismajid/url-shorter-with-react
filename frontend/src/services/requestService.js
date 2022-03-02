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

const getAllUserUrls = async (currentPage) => {
  try {
    return await http.get(`/dashboard/urls?page=${currentPage}`);
  } catch (err) {
    throw err;
  }
};

const getProfile = async () => {
  try {
    return await http.get("/dashboard/profile");
  } catch (err) {
    throw err;
  }
};

const changeProfile = async (updatedUser) => {
  try {
    return await http.put("/dashboard/profile", updatedUser);
  } catch (err) {
    throw err;
  }
};

const uploadAvatar = async (formData) => {
  try {
    return await http.post("/dashboard/profile/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (err) {
    throw err;
  }
};

const removeAvatar = async () => {
  try {
    return await http.put("/dashboard/profile/avatar");
  } catch (err) {
    throw err;
  }
};

const resetPasswordProfile = async () => {
  try {
    return await http.get("/dashboard/profile/reset-password");
  } catch (err) {
    throw err;
  }
};

const removeUrl = async (id) => {
  try {
    return await http.delete("/url", { data: { id } });
  } catch (err) {
    throw err;
  }
};

const updateUrlReq = async (updatedUrl) => {
  try {
    return await http.put("/url", updatedUrl);
  } catch (err) {
    throw err;
  }
};

const getAllUsersUrls = async (currentPage) => {
  try {
    return await http.get(`/admin/urls?page=${currentPage}`);
  } catch (err) {
    throw err;
  }
};

const getAllUsers = async () => {
  try {
    return await http.get("/admin/users");
  } catch (err) {
    throw err;
  }
};

const changeRole = async (userId) => {
  try {
    return await http.put("/admin/user", { userId });
  } catch (err) {
    throw err;
  }
};

const deleteUser = async (userId) => {
  try {
    return await http.delete("/admin/user", { data: { userId } });
  } catch (err) {
    throw err;
  }
};

export {
  registerReq,
  loginReq,
  addUrl,
  getUrl,
  getAllUserUrls,
  getProfile,
  changeProfile,
  uploadAvatar,
  removeAvatar,
  resetPasswordProfile,
  removeUrl,
  updateUrlReq,
  getAllUsersUrls,
  getAllUsers,
  changeRole,
  deleteUser,
};
