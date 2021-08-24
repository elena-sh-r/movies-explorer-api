const dotenv = require('dotenv');

dotenv.config();

const {
  DB_PATH = 'mongodb://localhost:27017/moviesdb',
  PORT = 3000,
  JWT_SECRET,
  NODE_ENV,
} = process.env;

const DEV_JWT_SECRET = 'some-secret-key';

module.exports = {
  DB_PATH,
  PORT,
  NODE_ENV,
  JWT_SECRET,
  DEV_JWT_SECRET,
};
