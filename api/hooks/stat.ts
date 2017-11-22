import globalHooks = require('../hooks');

import { getByDot, incrementByDot, setByDot } from '../hooks';

import hooks = require('feathers-hooks-common');

export function updateStat(
    service = 'stats', nameAs = 'stat', childField = 'user', parentField = 'user',
    categoryField = 'question.category', isCorrectFeild = 'isCorrect') {
    return hooks.combine(
        populateStat(service, nameAs, parentField, childField), // populate current stat
        incrementStat(service, nameAs, childField, categoryField, isCorrectFeild), // increment the counts in the stat
    );
}

export function populateStat(
    service = 'stats', nameAs = 'stat', childField = 'user', parentField = 'user') {
    return globalHooks.include({ // populate the current stat
        service,
        nameAs,
        parentField,
        childField,
    });
}

/// takes the stat object in the hook data and updates it
export function incrementStat(
    service = 'stats', nameAs = 'stat', childField = 'user',
    categoryField = 'question.category', isCorrectFeild = 'isCorrect') {
    return hook => {
        let data = hook.data;

        let isCorrect = getByDot(data, isCorrectFeild);
        let category = getByDot(data, categoryField);

        let newStat = calculateNewStat(data[nameAs], isCorrect, category);

        hook.data[nameAs] = newStat;
        hook.app.service(service).patch(newStat._id, newStat); // save new Stat

        return hook;
    };
}

/// creates a stat object 
/// and sets the childField to the value of parentField in the hook data object
export function createStat(service = 'stats', nameAs = 'stat', childField = 'user', parentField = 'result._id') {
    return hook => {
        return hook.app.service(service).create({
            [childField]: getByDot(hook, parentField),
            categories: {},
            correct: 1,
            answeredCount: 1,
            countdown: 1,
        }).then(stat => {
            hook.data[nameAs] = stat;

            return hook;
        });
    };
}

function calculateNewStat(stat, isCorrect: boolean, category?: string) {
    let categoryPath = 'categories.' + category;

    incrementByDot(stat, 'correct', isCorrect ? 1 : 0);
    incrementByDot(stat, 'answeredCount');

    if (category) {
        incrementByDot(stat, categoryPath + '.correct', isCorrect ? 1 : 0);
        incrementByDot(stat, categoryPath + '.answeredCount');
    }

    return stat;
}
