const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');

dotenv.config();
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedError('Необходима авторизация!');
    }

    const token = authorization.replace('Bearer ', '');
    let payload;

    try {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
    } catch (err) {
      throw new UnauthorizedError('Необходима авторизация!');
    }

    req.user = payload;

    next();
  } catch (err) {
    next(err);
  }
};
