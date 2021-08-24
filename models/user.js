const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/unauthorized-error');
const {
  INVALID_EMAIL_ERROR_TEXT,
  INVALID_CREDENTIALS_ERROR_TEXT,
} = require('../consts');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: isEmail,
      message: INVALID_EMAIL_ERROR_TEXT,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
}, {
  versionKey: false,
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(INVALID_CREDENTIALS_ERROR_TEXT));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(INVALID_CREDENTIALS_ERROR_TEXT));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
