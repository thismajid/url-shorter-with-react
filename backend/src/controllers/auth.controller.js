import SendResponse from '../utils/sendResponse.util';
import {
  findUsername,
  findEmail,
  createUser,
  authenticateUser,
  createNewResetPassword,
  findToken,
  updatePassword,
  expireToken,
} from '../services/auth.service';
import { generateToken } from '../services/jwt.service';
import EmailService from '../services/email.service';

const createAdmin = async () => {
  try {
    const adminInfo = {
      firstname: 'admin',
      lastname: 'admin',
      email: 'admin@admin.com',
      username: 'admin',
      password: '123456aA',
      role: 'admin',
    };

    const adminFound = await findUsername(adminInfo.username);

    if (!adminFound) {
      await createUser(adminInfo);
    }
  } catch (err) {
    throw err;
  }
};

const register = async (req, res) => {
  const sendResponse = new SendResponse();
  try {
    const { firstname, lastname, email, username, password } = req.body;
    const usernameFound = await findUsername(username);
    if (usernameFound) {
      return sendResponse
        .setError(400, 'Duplicate username, please pickup another username')
        .send(res);
    }
    const emailFound = await findEmail(email);
    if (emailFound) {
      return sendResponse
        .setError(
          400,
          'Duplicate email address, please enter another email address'
        )
        .send(res);
    }
    const newUser = await createUser({
      firstname,
      lastname,
      email,
      username,
      password,
    });
    return sendResponse
      .setSuccess(201, 'User created successfully', newUser)
      .send(res);
  } catch (err) {
    console.log(err);
    sendResponse.setError(400, err.message).send(res);
  }
};

const login = async (req, res) => {
  const sendResponse = new SendResponse();
  try {
    const { username, password } = req.body;
    const userFound = await findUsername(username);
    if (!userFound) {
      return sendResponse.setError(404, 'Invalid username').send(res);
    }
    const matchPassword = await authenticateUser(username, password);
    if (!matchPassword) {
      return sendResponse.setError(404, 'Invalid password').send(res);
    }
    return sendResponse
      .setSuccess(200, 'Login successfully', {
        user: userFound,
        token: generateToken({
          userId: userFound._id,
          firstname: userFound.firstname,
          lastname: userFound.lastname,
          username: userFound.username,
          role: userFound.role,
          avatar: userFound.avatar,
        }),
      })
      .send(res);
  } catch (err) {
    console.log(err);
    sendResponse.setError(400, err.message).send(res);
  }
};

const forget = async (req, res) => {
  const sendResponse = new SendResponse();
  const emailService = new EmailService();
  try {
    const { username, email } = req.body;
    const user = username
      ? await findUsername(username)
      : await findEmail(email);
    if (!user)
      return sendResponse.setError(404, 'Invalid username/email').send(res);
    const { token } = await createNewResetPassword(user.email);
    await emailService.sendEmail(email, user.firstname, token);
    return sendResponse
      .setSuccess(200, 'Email with reset password link has been sent')
      .send(res);
  } catch (err) {
    console.log(err);
    sendResponse.setError(400, err.message).send(res);
  }
};

const reset = async (req, res) => {
  const sendResponse = new SendResponse();
  try {
    const { email, password, token } = req.body;
    const tokenFound = await findToken(token);
    if (!tokenFound || tokenFound.isUsed || email !== tokenFound.email)
      throw new Error('Invalid token');
    const user = await findEmail(tokenFound.email);
    if (!user) return sendResponse.setError(404, 'User not found').send(res);
    await updatePassword(user._id, password);
    await expireToken(tokenFound._id);
    return sendResponse
      .setSuccess(200, 'Update password successfully')
      .send(res);
  } catch (err) {
    sendResponse.setError(400, err.message).send(res);
  }
};

export { createAdmin, register, login, forget, reset };
