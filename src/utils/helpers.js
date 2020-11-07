/*
 * copy/paste from [Dan Abramov](https://github.com/gaearon/)
 *https://github.com/gaearon/overreacted.io/blob/master/src/utils/helpers.js
 *
 */
export function formatReadingTime(minutes) {
  const cups = Math.round(minutes / 5)
  return `${new Array(cups || 1).fill('⌛').join('')} ${minutes} min read`
}
