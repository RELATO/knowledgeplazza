import globalHooks = require('../../../hooks');
import hooks = require('feathers-hooks-common');
const auth = require('feathers-authentication').hooks;

import itemSource = require('../items');

function assignArchiveItem() {
  return hook => {
    Object.assign(hook.data, itemSource.randomItem());
  };
}

// Contributes to the item creation in the archive 
export = {
  before: {
    all: [
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated(),
    ],
    find: [auth.queryWithCurrentUser({ idField: '_id', as: 'user' })],
    get: [],
    create: [
      hooks.disable('external'),
      assignArchiveItem(),
      hooks.setCreatedAt('unlockedAt'),
    ],
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
