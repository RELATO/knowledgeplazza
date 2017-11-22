import { enforceUnique, include, requireString } from '../../../hooks';
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
    // TODO: only show groups that you are a member of
    find: [auth.queryWithCurrentUser({ idField, as: ownerField })],
    // TODO: only show groups that you are a member of
    get: [auth.restrictToOwner({ idField,  ownerField })],
    create: [
      requireString('name'),
      auth.associateCurrentUser({ idField, as: ownerField }),
      enforceUnique('memberIds'),
    ],
    update: [
      auth.restrictToOwner({ idField,  ownerField }),
      enforceUnique('memberIds'),
    ],
    patch: [
      auth.restrictToOwner({ idField,  ownerField }),
      enforceUnique('memberIds'),
    ],
    remove: [auth.restrictToOwner({ idField,  ownerField })],
  },
  after: {
    all: [include({
      service: 'users',
      nameAs: 'members',
      parentField: 'memberIds',
      childField: '_id',
      query: {
        $select: ['_id', 'username'],
      },
      asArray: true,
    })],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
