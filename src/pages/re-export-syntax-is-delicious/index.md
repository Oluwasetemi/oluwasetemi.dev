---
title: re-export syntax is delicious
date: '2020-09-06T09:00:00.000Z'
tags: [javascript, learning, code]
isPublished: true
isDraft: false
modified: true
modifiedDate: '2020-11-05T08:09:12.044Z'
---

Recently joined a team where I had to work with on a codebase that used the JavaScript module re-export syntax and It was such a nice, elegant and delicious syntax. I would talk about the syntax and its use case and exceptions. Sit with me and let have a ride of a lifetime.

```js{1,3}
export { default } from './AutoComplete'

export { User } from './User.js'
```

Is this your first time seeing this form of syntax?🙀 If yes i can assure you it is something you know already. It's called re-export syntax which comes from the **JavaScript modules syntax**. let's get familiar with the import and export syntax of the JavaScript modules. *They help us write more modular JavaScript code. Split our code functionality into several files and folder for proper arrangement and orderliness in our codebase*.

Imagine a sum and subtract function in a separate file below:

```js
// assume this code is in ./math.js
const sum = (a, b) => a + b
const subtract = (a, b) => a - b

export { sum, subtract }
```

The above is a `named export` i.e you can export functions, variable and class based on their name where you declared them. It permits more than one in a file. Don't go overly in its usage. It exports an object that contains `sum` and `subtract` function.

Another important thing in the JavaScript modules is the `default import and export`. This one below use the `default export` and some of it peculiarity is that you can give it any name when you import it so long as it is a default export. Consider the snippet below from the `math2.js`. It default exports `sum` which can be imported in another file. it also say sum is the main functionality that the file is exporting.

```js{2,4}
// assume this code is in ./math2.js
const sum = (a, b) => a + b

export default sum
```

Both the default export and named export can take two formats, export during declaration or export after declaration. We can also combine both the default and the named export together in a single file.

```js{5,9}
// assume this code is in ./math3.js
const sum = (a, b) => a + b
const subtract = (a, b) => a - b

export { sum, subtract }

const mul = (a, b) => a * b

export default mul
```

The snippet above exports both the named export of `sum` and `subtract` and the default export of `mul`. We can import using both the `default import` and a `named import`.

```js
// assume this code use ./math3.js
import mul, { sum, subtract } from './math3'
```

Other examples of the various use of modules in JavaScript are shown below.

```js{3-11,13,16,19,22,26,28,30}
// export during declaration

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

I should tell you about `import as` and `export as`, this happens by using the `as` - keyword to rename either a default export or named export. The major reason why we do this is to avoid namespace conflicts and more control on variable name we import.

```js{2, 6}
// renamed export of the named export of sum and subtraction in './math.js'
import {sum as add, subtraction as minus} from './math'
// we have successfully renamed both sum to add and subtraction to minus respectfully

// it allow us to rename the default export as well
import {default as sum} from './math2'
```

Another important aspect of javascript modules is the `import *` and `export *`. A sort of import and export that use the `*` and `as`. They leverage the power of `import as` and `export as`.
For the snippet below let us assume that both named export and default export are in the `math3.js` file and we need to import it using the import everything (*) as.

```js{1,4}
import * as Everything from './math3'
// the variable Everything will contain an object that contains both the default and the named export.

import mul, * as Everything from './math3'
// the variable Everything will contain an object that contains both the default and the named export, so we can access our named import with Everything.sum and Everything.subtract.
// The default export mul still works fine
```

What I have tried to do above is to introduce you to the complexity of the JavaScript module syntax.

Back to my re-export story and how delicious it is. Example of situation to use the re-export syntax is when handling large components directory  or library developer who want to both *import a module and yet export it in the same file*.

Back to our above snippet.

```js{2,5}
// 1A
export { default as AutoComplete } from './AutoComplete'

// 2B
export { default as User } from './User.js'
```

So you see the snippet excerpt (1A) with `export { default as AutoComplete } from './AutoComplete'` is the same with the (1A) below. It just simplifies the code for readability and ability to include other import for robustness. So re-export syntax which was my focus for writing this post comes very handy but it takes a while to understand and get familiar with.

But I am sure that if you see it in a code base you won't be perplexed but rather soak it in deep to understand it further. To say explicitly that re-export is the same as the combination of a `default import` and `named export`.

JavaScript modules made the work of writing JavaScript easy and hence has aided in the modern development journey that we are thus enjoying as JavaScript Developers.

modified on 9th November, 2020

```js{2-3,6-7}
// 1A
import AutoComplete from './AutoComplete';
export {AutoComplete};

// 2B
import User from './User.js'
export {User};
```
