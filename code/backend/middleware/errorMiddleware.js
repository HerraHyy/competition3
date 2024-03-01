// errorMiddleware.js

function errorHandler(err, req, res, next) {
  console.error(err.stack); // Log error stack trace to the console
  res.status(500).send({ message: 'An unexpected error occurred!' });
}

module.exports = errorHandler;