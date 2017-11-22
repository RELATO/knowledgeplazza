import path = require('path');
import NeDB = require('nedb');
import service = require('feathers-nedb');
import hooks = require('./hooks');

module.exports = function(){
  const app = this;

  const db = new NeDB({
    filename: path.join(app.get('nedb'), 'battles.db'),
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
  app.use('/battles', service(options));

  // Get our initialize service to that we can bind hooks
  const battlesService = app.service('/battles');

  // Set up our before hooks
  battlesService.before(hooks.before);

  // Set up our after hooks
  battlesService.after(hooks.after);
};
