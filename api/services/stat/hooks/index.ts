import globalHooks = require('../../../hooks');
import hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;

export = {
  before: {
    all: [
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated(),
    ],
    find: [],
    get: [],
    create: [hooks.disable('external')],
    update: [hooks.disable('external')],
    patch: [hooks.disable('external')],
    remove: [hooks.disable('external')],
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
