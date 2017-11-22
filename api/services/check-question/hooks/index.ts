import globalHooks = require('../../../hooks');
import hooks = require('feathers-hooks-common');
const auth = require('feathers-authentication').hooks;
import { updateUnlockCountdown } from '../../../hooks/archive-item';
import { updateStat } from '../../../hooks/stat';

export = {
  before: {
    all: [
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated(),
    ],
    find: [],
    get: [],
    create: [
      auth.associateCurrentUser({ idField: '_id', as: 'user' }), // get current user so we can do user stats
      globalHooks.include({
        service: 'questions',
        nameAs: 'question',
        parentField: 'questionId', // the property in the hooks data
        childField: '_id', // the property in the data we're trying to get from service
        query: {
          $select: ['correctAnswer', 'category'],
        },
      }),
      globalHooks.compute({
        isCorrect: (item, hook) => item.chosenAnswer === item.question.correctAnswer,
        correctAnswer: (item, hook) => item.question.correctAnswer,
      }),
    ],
    update: [],
    patch: [],
    remove: [],
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [
      updateStat(),
      hooks.iff(hook => hook.data.battle,
        // create/update battle stat entry if we get passed a battle id  
        updateStat('battle-stats', 'battle-stat', 'battleId', 'battle'),
      ),
      updateUnlockCountdown(),
    ],
    update: [],
    patch: [],
    remove: [],
  },
};
