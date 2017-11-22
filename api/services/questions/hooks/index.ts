import { getRandom } from '../../../hooks';
import hooks = require('feathers-hooks-common');

function toNumber(property) {
  return hook => {
    hook.data[property] = +hook.data[property];
  };
}

export = {
  before: {
    all: [],
    find: [getRandom({service: 'questions'})],
    get: [],
    create: [toNumber('correctAnswer')],
    update: [],
    patch: [],
    remove: [],
  },
  after: {
    all: [hooks.remove('correctAnswer')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
