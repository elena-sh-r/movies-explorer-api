const mongoose = require('mongoose');

const validateUrl = (v) => /^https?:\/\/(www\.)?[a-zA-Z0-9-]*\.[a-zA-Z0-9]*\b([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)#?/.test(v);

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: validateUrl,
      message: 'Неправильный формат адреса',
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: validateUrl,
      message: 'Неправильный формат адреса',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: validateUrl,
      message: 'Неправильный формат адреса',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  movieId: {
    type: String,
    required: true,
    unique: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
