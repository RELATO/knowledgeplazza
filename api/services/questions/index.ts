import path = require('path');
import NeDB = require('nedb');
import service = require('feathers-nedb');
import hooks = require('./hooks');
import { calculateQuestionCategories } from '../question-categories/question-categories';

module.exports = function(){
  const app = this;

  const db = new NeDB({
    filename: path.join(app.get('nedb'), 'questions.db'),
    autoload: true,
  });

  let options = {
    Model: db,
    paginate: {
      default: 5,
      max: 25,
    },
  };

  // Initialize our service with any options it requires
  app.use('/questions', service(options));

  // Get our initialize service to that we can bind hooks
  const questionsService = app.service('/questions');

  // Set up our before hooks
  questionsService.before(hooks.before);

  // Set up our after hooks
  questionsService.after(hooks.after);

  // add calculated question categories
  calculateQuestionCategories(app).then(questionCategories => {
      app.service('/question-categories').create(questionCategories);
  });
};
