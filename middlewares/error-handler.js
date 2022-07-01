const ValidationError = require('../errors/validation-error');
const ConflictingError = require('../errors/conflicting-error');
const { COMMON_ERROR_TEXT } = require('../consts');

const COMMON_ERROR_CODE = 500;

const getValidError = (err) => {
  if (err.statusCode) {
    return err;
  }

  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return new ValidationError(err.message);
  }

  if (err.name === 'MongoError' && err.code === 11000) {
    return new ConflictingError(err.message);
  }

  return { ...err, statusCode: COMMON_ERROR_CODE };
};

const errorHandler = (err, req, res, next) => {
  const { statusCode, message } = getValidError(err);

  res
    .status(statusCode)
    .send({
      message: statusCode === COMMON_ERROR_CODE
        ? COMMON_ERROR_TEXT
        : message,
    });

  next();
};

module.exports = {
  errorHandler,
};
