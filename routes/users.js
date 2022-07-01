const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getMe,
  patchUser,
} = require('../controllers/users');

router.get('/me', getMe);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().min(2).max(30),
  }),
}), patchUser);

module.exports = router;
