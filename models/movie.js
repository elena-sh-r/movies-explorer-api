const mongoose = require('mongoose');
const { isValidUrl } = require('../utils/validation');
const { INVALID_ADDRESS_ERROR_TEXT } = require('../consts');

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
      validator: isValidUrl,
      message: INVALID_ADDRESS_ERROR_TEXT,
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: isValidUrl,
      message: INVALID_ADDRESS_ERROR_TEXT,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: isValidUrl,
      message: INVALID_ADDRESS_ERROR_TEXT,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  movieId: {
    type: Number,
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
}, {
  versionKey: false,
});

module.exports = mongoose.model('movie', movieSchema);
