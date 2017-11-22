// Add any common hooks you want to share across services in here.
// 
// Below is an example of how a hook is written and exported. Please
// see http://docs.feathersjs.com/hooks/readme.html for more details
// on hooks.

import _ = require('lodash');
import hooks = require('feathers-hooks-common');
import { getByDot, setByDot } from './helper';

export * from './helper';

/**
 * Test validation logic: requires property to be a string
 * 
 * @export
 * @param {string} property
 * @returns
 */
export function requireString(property: string) {
  return hook => {
    // TODO: this should be replaced by real validation logic
    // Throw error if string field does not exist or is empty
    try {
      if (hook.data[property].length === 0) {
        throw new Error('Property ' + property + ' must have content');
      }
    } catch (err) {
      throw new Error('Must have property ' + property);
    }
  };
};

/**
 * Make sure that the values in an array are unique
 * 
 * @export
 * @param {string} path pathToGetArrayFrom
 * @param {string} [uniqueBy] valueOfObjectsInArrayToCompare
 * @returns
 */
export function enforceUnique(path: string, uniqueBy?: string) {
  if (!uniqueBy) {
    return hook => {
      const values = getByDot(hook.data, path);
      setByDot(hook.data, path, _.uniq(values));
      return hook;
    };
   } else {
    return hook => {
      const values = getByDot(hook.data, path);
      setByDot(hook.data, path, _.uniqBy(values, uniqueBy));
      return hook;
    };
   }
};

/**
 * enable get random item query
 * Ex: query = { $random: 1 } should return one random item
 * @export
 * @param {any} options
 * @returns
 */
export function getRandom(options) {
  return hook => {
    const query = hook.params.query;
    if (query && query.$random > 0) {
      const numResults = query.$random;
      hook.params.query = _.omit(query, '$random');
      hook.result = hook.app.service(options.service).find(hook.params).then(result => {
        return _.sampleSize(result.data, numResults);
      });
    }
    return hook;
  };
};

/**
 * enable special field '$search' in query by creating a regular expression
 * 
 * @export
 * @param {any} flags flags to pass to the regular expression
 * @returns
 */
export function searchRegex(flags) {
  return specialField('$search', (query, value, fieldIn) => {
    try {
      let expr = new RegExp(value, flags);
      query[fieldIn] = { $regex: expr };
    } catch (error) {
      query[fieldIn] = {};
    }
    return query;
  });
};

/**
 * Shortcut for creating a special field hook
 * 
 * @export
 * @param {string} specialField name of the special field (ie. $random)
 * @param {(query, value, fieldIn, hook?) => any} callback called every time specialField is found in query
 */
export function specialField(specialField: string, callback: (query, value, fieldIn, hook?) => any) {
  return hook => {
    const query = hook.params.query;
    for (let field in query) {
      if (query[field][specialField] && field.indexOf('$') === -1) {

        let value = query[field][specialField];

        hook.params.query = callback(query, value, field, hook);
      }
    }
    return hook;
  };
};

/**
 * enable special field $append
 * !! Not yet implemented
 * 
 * @export
 * @returns
 */
// export function append() {
//   return specialField('$append', (query, value, fieldIn) => {

//     return query;
//   });
// };
