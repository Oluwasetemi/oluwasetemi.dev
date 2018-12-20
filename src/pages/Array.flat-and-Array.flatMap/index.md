---
title: Array.flat and Array.flatMap
date: '2018-12-20T23:50:00.121Z'
---

A Short love story of the experimental new addition to the Array methods - the Flat and FlatMap. We can **level flat** any irregular array (an array that contains array or arrays) irrespective of the depth level plus the one opportunity to flatten and map at the same time is a very cool feature coming to JavaScript after the whole `Array.smooch` episode.

```js {2,3}
// syntax
Array.flat()
Array.flatMap()
```

### How do we flatten an Array Before ?

```js {1,4}
const flatten = (arr, depth = 1) =>
  arr.reduce(
    (a, v) =>
      a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v),
    []
  )
```

```js {2}
const flattened = arr => [].concat(...arr)

function flattenArray(arr) {
  const flattened = [].concat(...arr)
  return flattened.some(item => Array.isArray(item) ? flattenArray(flattened) : flattened)
}
```

Use recursion, decrementing depth by 1 for each level of depth. Use Array.prototype.reduce() and Array.prototype.concat() to merge elements or arrays. Base case, for depth equal to 1 stops recursion. Omit the second argument, depth to flatten only to a depth of 1 (single flatten).

---

Deep flattens an array.

Use recursion. Use Array.prototype.concat() with an empty array ([]) and the spread operator (...) to flatten an array. Recursively flatten each element that is an array.

```js
const deepFlatten = arr =>
  [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)))
```

### Now Behold your Future

The Syntax

```js
;[1, 2, [3, [4, 5]], 5, 6].flatMap((v, i) => (Array.isArray(v) ? v.flat() : v))
```

```js
[1, 2, [3,[ 4, 5]], 5, 6].flat(2)
```

### Possible Usecase
