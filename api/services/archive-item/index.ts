import path = require('path');
import NeDB = require('nedb');
import service = require('feathers-nedb');
import hooks = require('./hooks');

module.exports = function(){
  const app = this;

  const db = new NeDB({
    filename: path.join(app.get('nedb'), 'archive-items.db'),
    autoload: true,
  });

  let options = {
    Model: db,
    paginate: {
      default: 25,
      max: 100,
    },
  };

  // Initialize our service with any options it requires
  app.use('/archive-items', service(options));

  // Get our initialize service to that we can bind hooks
  const archiveItemService = app.service('/archive-items');

  // Set up our before hooks
  archiveItemService.before(hooks.before);

  // Set up our after hooks
  archiveItemService.after(hooks.after);
};
