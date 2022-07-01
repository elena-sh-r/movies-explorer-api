const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const { NOT_FOUND_USER_ERROR_TEXT } = require('../consts');

const { NODE_ENV, JWT_SECRET, DEV_JWT_SECRET } = require('../config');

module.exports.getMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError(NOT_FOUND_USER_ERROR_TEXT))
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const user = req.body;

  bcrypt.hash(user.password, 10)
    .then((hash) => User.create({ ...user, password: hash })
      .then((newUser) => {
        const userToReturn = newUser.toObject();
        delete userToReturn.password;
        return res.send({ data: userToReturn });
      })
      .catch(next));
};

module.exports.patchUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true, upsert: false })
    .then((user) => {
      if (user === null) {
        throw new NotFoundError(NOT_FOUND_USER_ERROR_TEXT);
      }
      return res.send({ data: user });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : DEV_JWT_SECRET,
        { expiresIn: '7d' },
      );
      return res.send({ token });
    })
    .catch(next);
};
