const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');
const { UNAUTHORIZED_ERROR_TEXT } = require('../consts');

const { NODE_ENV, JWT_SECRET, DEV_JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedError(UNAUTHORIZED_ERROR_TEXT);
    }

    const token = authorization.replace('Bearer ', '');
    let payload;

    try {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : DEV_JWT_SECRET);
    } catch (err) {
      throw new UnauthorizedError(UNAUTHORIZED_ERROR_TEXT);
    }

    req.user = payload;

    next();
  } catch (err) {
    next(err);
  }
};
