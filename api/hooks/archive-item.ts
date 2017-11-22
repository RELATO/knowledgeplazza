import { decrementByDot, getByDot, setByDot } from './helper';

/**
 * updates the unlock countdown on a stat, unlocking an archive item and resetting if it hits zero
 * @export
 * @returns
 */
export function updateUnlockCountdown(pathToStat = 'data.stat', pathToUser = 'params.user._id') {
  return hook => {
    let stat = getByDot(hook, pathToStat);
    let user = getByDot(hook, pathToUser);

    // decrement countdown
    let atZero = decrementByDot(stat, 'countdown');

    if (atZero) {
      // Awesome! unlock the next archive item
      hook.app.service('archive-items').create({user});

      // magic equation for calcuating item unlocks;      
      const nextUnlock = Math.floor(Math.pow(stat.answeredCount + 4, 2 / 3));
      setByDot(stat, 'countdown', nextUnlock);
    }
    return hook;
  };
}
