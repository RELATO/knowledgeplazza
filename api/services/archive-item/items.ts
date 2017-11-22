// Items created by the archive

import _ = require('lodash');

export const items = [
  { img: 'washington.jpg', name: 'George Washington' },
  { img: 'jackson.jpg', name: 'Andrew Jackson' },
  { img: 'trump.jpg', name: 'Donald Trump' },
  { img: 'washington.jpg', name: 'George Washington' },
  { img: 'trump.jpg', name: 'Donald Trump' },
  { img: 'jackson.jpg', name: 'Andrew Jackson' },
  { img: 'washington.jpg', name: 'George Washington' },
  { img: 'trump.jpg', name: 'Donald Trump' },
  { img: 'jackson.jpg', name: 'Andrew Jackson' },
  { img: 'trump.jpg', name: 'Donald Trump' },
  { img: 'washington.jpg', name: 'George Washington' },
  { img: 'jackson.jpg', name: 'Andrew Jackson' },
];

export function randomItem() {
  return _.sample(items);
}
