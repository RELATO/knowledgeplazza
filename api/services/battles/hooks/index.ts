import { compute } from '../../../hooks';
import hooks = require('feathers-hooks-common');
const auth = require('feathers-authentication').hooks;

const ownerField = 'owner';
const idField = '_id';

export = {
  before: {
    all: [
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated(),
    ],
    find: [auth.queryWithCurrentUser({ idField, as: ownerField })],
    get: [],
    create: [
      hooks.setCreatedAt(),
      auth.associateCurrentUser({ idField, as: ownerField }),
    ],
    update: [],
    patch: [],
    remove: [],
  },
  after: {
    all: [],
    find: [compute({name: () => 'A Battle'})],
    get: [compute({name: () => 'A Battle'})],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
