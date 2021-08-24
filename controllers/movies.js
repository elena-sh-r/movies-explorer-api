const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const { NOT_FOUND_MOVIE_ERROR_TEXT, FORBIDDEN_DELETE_ERROR_TEXT } = require('../consts');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const movie = req.body;
  movie.owner = req.user._id;

  Movie.create(movie)
    .then((newMovie) => res.send({ data: newMovie }))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .orFail(new NotFoundError(NOT_FOUND_MOVIE_ERROR_TEXT))
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        return Movie.deleteOne(movie)
          .then((ownerMovie) => res.send({ data: ownerMovie }));
      }
      throw new ForbiddenError(FORBIDDEN_DELETE_ERROR_TEXT);
    })
    .catch(next);
};
