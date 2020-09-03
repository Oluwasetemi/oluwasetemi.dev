---
title: re-export syntax is delicious
date: '2020-09-06T09:00:00.000Z'
tags: -javascript, -learning, -code
---

Recently joined a team where I had to work with on a codebase that used the JavaScript module re-export syntax and It was such a nice, elegant and delicious syntax. I would talk about the syntax and its use case and exceptions. Sit with me and let have a ride of a lifetime.

```js{1,3}
export { default } from './AutoComplete'

export { User } from './User.js'
```

Is this your first time seeing this form of syntax? If yes i can assure you it is something you know already. It's called re-export syntax which comes from the JavaScript modules syntax. let's get familiar with the import and export syntax of the JavaScript modules. They help use write more modular JavaScript code. Split our code functionality into several files and folder for proper arrange and orderliness in our codebase.

Imagine a sum and subtract function in a separate file below:

```js
// assume this code is in ./math.js
const sum = (a, b) => a + b
const subtract = (a, b) => a - b

export { sum, subtract }
```

Another important thing in the JavaScript modules is the default import and export. It's either the named export or default export. The first example above is a named export. It exports an object that contains sum and subtract function.

```js{2,4}
// assume this code is in ./math.js
const sum = (a, b) => a + b

export default sum
```

It can take two formats, export before declaration and export after declaration.

```js{4,6}
// assume this code is in ./math.js
// export before declaration

export let daysOfTheWeek = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
]

export const sum = (a, b) => a + b

// export after declaration
const square = x => x * x

// name export
export { square }

// default export
export default square

// import
// named import
import { square } from './math.js'
// import as
import * as math from './math.js'
// default import
import square from './math.js'
```

Back to my re-export story and how delicious it is.

work in progress.
