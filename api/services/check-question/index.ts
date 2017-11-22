import hooks = require('./hooks');

export class Service {
  constructor(private app) {
  }

  // check question only needs 'create'
  create(data, params) {
    // nothing to acutually do here, all handled by hooks
    return Promise.resolve(data);
  }

}

module.exports = function(){
  const app = this;

  // Initialize our service with any options it requires
  app.use('/check-questions', new Service(app));

  // Get our initialize service to that we can bind hooks
  const checkQuestionService = app.service('/check-questions');

  // Set up our before hooks
  checkQuestionService.before(hooks.before);

  // Set up our after hooks
  checkQuestionService.after(hooks.after);
};
