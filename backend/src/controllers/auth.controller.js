import SendResponse from '../utils/sendResponse.util';
import {
  findUsername,
  findEmail,
  createUser,
  authenticateUser,
} from '../services/auth.service';
import { generateToken } from '../services/jwt.service';

const sendResponse = new SendResponse();

const register = async (req, res, next) => {
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
    sendResponse.setError(400, err.message).send(res);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const userFound = await findUsername(username);
    const matchPassword = await authenticateUser(username, password);
    if (!userFound || !matchPassword) {
      return sendResponse.setError(404, 'Invalid username/password').send(res);
    }
    return sendResponse
      .setSuccess(200, 'Login successfully', {
        user: userFound,
        token: generateToken({
          id: userFound._id,
          firstname: userFound.firstname,
          lastname: userFound.lastname,
        }),
      })
      .send(res);
  } catch (err) {
    console.log(err);
    sendResponse.setError(400, err.message).send(res);
  }
};

const forget = async (req, res, next) => {};

const reset = async (req, res, next) => {};

export { register, login, forget, reset };
