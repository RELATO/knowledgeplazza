// Tells the user that the page was not found they're looking for was not 
import errors = require('feathers-errors');

export function notFound() {
  return (req, res, next) => {
    next(new errors.NotFound('Page not found'));
  };
};
