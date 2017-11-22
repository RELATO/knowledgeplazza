import utils = require('feathers-hooks-common/lib/utils');
import hooks = require('feathers-hooks-common');

export const getByDot = utils.getByDot;
export const setByDot = utils.setByDot;

/**
 * adds one to the value at path, creating it if it doesn't exist
 * 
 * @export
 * @param {any} obj
 * @param {any} path
 * @param {number} [incrementBy=1] how much to increment the value at path by
 */
export function incrementByDot(obj, path: string, incrementBy = 1) {
    let current = getByDot(obj, path);
    if (!current) { current = 0; }
    setByDot(obj, path, current + incrementBy);
}

/**
 * subtracts one to the value at path, creating it if it doesn't exist
 * 
 * @export
 * @param {any} obj
 * @param {any} path
 * @param {number} [decrementBy=1] how much to decrement the value at path by
 * @returns {boolean} Returns 'true' if new value was decremented to zero
 */
export function decrementByDot(obj, path: string, decrementBy = 1) {
    let current = getByDot(obj, path);
    if (!current) { current = 0; }
    current -= decrementBy;
    setByDot(obj, path, current);

    return current <= 0;
}

/**
 * shortcut for hooks.populate({schema: {include: []}})
 * 
 * @export
 * @param {(any[] | any)} list
 * @returns
 */
export function include(list: any[] | any) {
  if (Array.isArray(list)) {
    return hooks.populate({schema: {include: list}});
  } else {
    // not passed an array, so wrap in one 
    return hooks.populate({schema: {include: [list]}});
  }
}

/**
 * shortcut for hooks.serialize({computed: {}})
 * 
 * @export
 * @param {*} values
 * @returns hook function
 */
export function compute(values: any) {
  return hooks.serialize({ computed: values });
}
