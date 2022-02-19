import Reset from '../models/reset.model';

const randomString = () => {
  const first_section = Date.now().toString(36);
  const second_section = Math.random().toString(36).substring(2);
  return first_section.concat(second_section);
};

const createNewResetPassword = async (email) => {
  try {
    return await Reset.create({ token: randomString(), email });
  } catch (err) {
    throw err;
  }
};

export { createNewResetPassword };
