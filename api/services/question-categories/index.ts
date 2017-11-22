import hooks = require('./hooks');
import memory = require('feathers-memory');

module.exports = function(){
  const app = this;

  // Initialize our service with any options it requires
  app.use('/question-categories', new memory({
    id: '_id',
  }));

  // Get our initialize service to that we can bind hooks
  const questionCategoriesService = app.service('/question-categories');

  // Set up our before hooks
  questionCategoriesService.before(hooks.before);

  // Set up our after hooks
  questionCategoriesService.after(hooks.after);

};
