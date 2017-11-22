import globalHooks = require('../../../hooks');
import { createStat, incrementStat } from '../../../hooks/stat';
import hooks = require('feathers-hooks-common');
const auth = require('feathers-authentication').hooks;

const ownerField = '_id';

export = {
  before: {
    all: [],
    find: [
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated(),
      globalHooks.searchRegex('i'),
    ],
    get: [
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated(),
      auth.restrictToOwner({ ownerField }),
    ],
    create: [
      auth.hashPassword(),
    ],
    update: [
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated(),
      auth.restrictToOwner({ ownerField }),
    ],
    patch: [
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated(),
      auth.restrictToOwner({ ownerField }),
    ],
    remove: [
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated(),
      auth.restrictToOwner({ ownerField }),
    ],
  },
  after: {
    all: [hooks.remove('password')],
    find: [],
    get: [],
    create: [
      createStat(), // start the user off with some good stats data
    ],
    update: [],
    patch: [],
    remove: [],
  },
};
