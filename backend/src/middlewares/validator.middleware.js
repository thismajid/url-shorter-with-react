import Ajv from 'ajv';

import SendResponse from '../utils/sendResponse.util';

const ajv = new Ajv();
const sendResponse = new SendResponse();

const registerValidator = async (req, res, next) => {
  const schema = {
    type: 'object',
    properties: {
      firstname: { type: 'string', minLength: 2, maxLength: 20 },
      lastname: { type: 'string', minLength: 2, maxLength: 20 },
      email: {
        type: 'string',
        pattern: '^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+.[a-zA-Z]{2,4}',
      },
      username: { type: 'string', minLength: 4, maxLength: 20 },
      password: {
        type: 'string',
        pattern:
          '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})',
      },
    },
    required: ['firstname', 'lastname', 'email', 'username', 'password'],
    additionalProperties: true,
  };

  try {
    const validate = ajv.compile(schema);
    const valid = validate(req.body);
    if (!valid) {
      let msg = '';
      validate.errors.forEach(async (err) => {
        msg += `${err.instancePath} ${err.message}`;
      });
      return sendResponse.setError(400, msg).send(res);
    }
    next();
  } catch (err) {
    next(err);
  }
};

const loginValidator = async (req, res, next) => {
  const schema = {
    type: 'object',
    properties: {
      username: { type: 'string', minLength: 4, maxLength: 20 },
      password: {
        type: 'string',
        pattern:
          '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})',
      },
    },
    required: ['username', 'password'],
    additionalProperties: true,
  };

  try {
    const validate = ajv.compile(schema);
    const valid = validate(req.body);
    if (!valid) {
      let msg = '';
      validate.errors.forEach(async (err) => {
        msg += `${err.instancePath} ${err.message}`;
      });
      return sendResponse.setError(400, msg).send(res);
    }
    next();
  } catch (err) {
    next(err);
  }
};

export { registerValidator, loginValidator };
