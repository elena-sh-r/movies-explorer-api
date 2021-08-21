const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

const NOT_FOUND_ERROR_TEXT = 'Запрашиваемый фильм не найден';

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
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
    .orFail(new NotFoundError(NOT_FOUND_ERROR_TEXT))
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        Movie.deleteOne(movie)
          .then((ownerMovie) => res.send({ data: ownerMovie }));
      } else {
        throw new ForbiddenError('Попытка удалить чужую карточку');
      }
    })
    .catch(next);
};
