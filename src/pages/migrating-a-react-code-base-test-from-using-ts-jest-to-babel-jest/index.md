---
title: Migrating a react code base test from using `ts-jest` to babel-jest
date: '2021-07-26T20:01:05.977Z'
tags: ['test', 'react', 'typescript']
isPublished: true
isDraft: false
---

<!-- Migrating a react code base test from using `ts-jest` to babel-jest -->
![ Leave no one behind]( https://images.unsplash.com/photo-1617575523032-fde690b9ad67?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=667&q=80)

> 📷 photo credit <a href="https://unsplash.com/@etiennegirardet">Etienne Girardet</a> from splash

* Issues with `ts-jest` includes test coverage issues, working with a certain version of jest, extra configuration.
* Opting for `babel-jest` that comes default to jest when a babel config is present in the root of you code.
* Beauty of `ts-jest` is that it test the types written in typescript unlike the `babel-jest` that does transformation to commmonjs.

Worked recently on a project where I have to use React with TypeScript and I had to write test with Jest, my first instinct was to look for "something" to transform my `tsx` to a format jest understands. [`ts-jest`](https://www.npmjs.com/package/ts-jest) was what came to mind after a bit of research. I guess it was all instinct to go ahead without looking for alternatives well yes the choice was very instinctive but it came with its challenges.

Why do we have to use a transformer to transform our code to a format that jest understands? The only simple way I can put it - is that jest will only run our test if it understands it. Jest was built with `node` so it understands JavaScript code.  Much more with a config you can set in the jest config file `jest.config.js` in the root directory of your code to allow test for browser JavaScript using an option called `js-dom`. But the situation is very different with Typescript, because Jest will need a way to understand the code we have written in `ts` / `Typescript` or `tsx` / `Typescript React`. Basically the work of `ts-jest` is to make jest understand the code you have written in `ts` or `tsx` and add types support.

Let see an example of a small `react` `TypeScript` that I will write test for. To get setup with `react-ts` I use the [`vitejs`](https://vitejs.dev/), it is a Create React App variant that offers another bundler entirely in [`es-build`](https://esbuild.github.io/). The major offering is speed and loads of sweetness that makes the job of a developer very easy when doing a simple scaffold. The Hot module replacement is blazing lightning fast and the instant Server start is just instant. It has more rich features that you can checkout from it main [website](https://vitejs.dev/).

To create a project with vitejs, all you need to do is to copy and paste this in your command line or terminal utility. The name of the folder your app will be created in is `react-typescript-playground`.

```sh{3,6,10}
# react-typescript-playground will be the name of the project
# I prefer yarn but if you like npm check how to use npm in place of yarn here
# https://classic.yarnpkg.com/en/docs/migrating-from-npm/#toc-cli-commands-comparison
yarn create @vitejs/app react-typescript-playground --template react-ts

# latter version of vite
yarn create vite
# follow the prompt

# or run this if you use npm
npm init vite@latest
```

In a no time depending on your [internet speed](https://fast.com) you will have a project setup for you to play with. Change directory into the new create app folder and run the yarn command to install the project dependencies. For vitejs the dependencies is minimal.

```sh{2-4}
# cd into the folder/project
cd react-typescript-playground
# run npm install or yarn to install the dependencies
# run the npm run dev or yarn dev to start the dev server
```

You should have a <https://localhost:3000> up and running if you have followed the steps up until now but incase you don't have <https://locahost:3000> running in you browser automatically. Please attempt to open your browser and run the localhost url. If you have a simple react interface - Good, but if not,  try to go through the steps again and carefully follow through till you have the desired result if not contact me :).

![Default Vite App](https://res.cloudinary.com/drnqdd87d/image/upload/v1627035711/Personal/vite-default_yfbtrv.png)

Now we can attempt to write test for the default counter implementation that comes with the starter. If you're not familiar with what test is then you must have written one form of academic test before right? I mean you're given some question that is used to check or evaluate or validate whether you understand and do have the knowledge of ( used relatively here ) what you have been taught by your teacher. So in that manner we can test what the app that we have just built does i.e it functions to the full knowledge of its features, check if it is not buggy 🐛. I mean test the counter to see if the app loads correctly and the increment actions are working the way you designed them to be right? ( the way vite team designed it to be 👁) - We assumed you built the great counter app.

Before we write test we need to install `ts-jest` to transform our ts and tsx files to a format that [jest](https://jestjs.io/) ( our delightful test runner ) understands. We need to install [identity obj proxy](https://www.npmjs.com/package/identity-obj-proxy) to help jest to understand our css module file - `app.css` file and we can mock out the files (svg and others) we use in our great counter app.

```sh
yarn add -D jest@24.x @types/jest @ts-jest@23.10.0 @testing-library/react @testing-library/js-dom
```

<blockquote>
  Installing the specific version of `ts-jest` and jest is important because the `ts-jest` team will throw a warning telling you that they have not tested the version you are using with the latest versions of `jest`. It also throws a version warning for typescript as well.
</blockquote>

create a ___tests___ folder in the `src` folder and add the first test. Let say we name the test `App.spec.tsx` or `App.test.tsx`

One thing I prefer to do is to create a `jest.config.js` file. You may generate a [config file using the command line](https://jestjs.io/docs/getting-started#generate-a-basic-configuration-file). You can read more about [configuring jest](https://jestjs.io/docs/configuration). it equivalent option is to add `jest` to my `package.json` file.

I will show the support for the 2 options with code samples.

```js
// add this to a jest.config.js file
module.exports = {
 // a set of setting that give typescript support to jest
 preset: 'ts-jest',

 // transform ts|tsx to a jest understandable format
 transform: {
  '.ts|tsx': 'ts-jest',
 },
 // mocking and transforming of css modules and other files
 moduleNameMapper: {
  '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
   '<rootDir>/src/__mocks__/fileMock.js',
  '\\.(css|less)$': 'identity-obj-proxy',
 },
 // important to expose all the jest-dom api globally in each test
  setupFilesAfterEnv: ["@testing-library/jest-dom/"]
};
```

`package.json` does not support comments. Comments were written for clearer explanation.

```json
// add this to package.json
"jest": {
 // a set of setting that give typescript support to jest
 "preset": "ts-jest",

 // transform ts|tsx to a jest understandable format
 "transform": {
  ".ts|tsx": "ts-jest",
 },
 // mocking and transforming of css modules and other files
 "moduleNameMapper": {
  "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
   "<rootDir>/src/__mocks__/fileMock.js",
  "\\.(css|less)$": "identity-obj-proxy",
 },
 // important to expose all the jest-dom api globally in each test
  "setupFilesAfterEnv": ["@testing-library/jest-dom/"]
}
```

it is all set to write a test in tsx and jest will run the test with `ts-jest`.

What will we be testing for? Well..test that the app render and certain element is in the document.

Using the render utility from `@testing-library/react` it will attempt to render all the tsx code using jest like react will render in our browser.

`getByText` api helps to get any element using the regex option and assert if the element exist inside the document using our matcher. For more on matchers your can check the [expect API](https://jestjs.io/docs/expect) or [jest-dom matchers](https://testing-library.com/docs/ecosystem-jest-dom/)

```tsx{2,4-6,8-10}
it('should renders app properly', () => {
  const { debug, getByText } = render(<App />);

  let count = getByText(/count is/);
  let react = getByText(/learn react/i);
  let vite = getByText(/hello vite/i);

  expect(count).toBeInTheDocument();
  expect(react).toBeInTheDocument();
  expect(vite).toBeInTheDocument();
 });
```

We can write other test for rendering the count to be 0 when the app loads, test the increment of the app and test if the app resets to count 0 when we rerender the whole thing. Add the following to the `App.spec.tsx`.

```tsx{2,4,6,10,12--13,15,19,21-23,25}
it('should have a count value of 0 when app loads', () => {
  const { getByText } = render(<App />);

  let count = getByText(/count is/);

  expect(count.textContent).toContain(0);
 });

 it('should increment count value', () => {
  const { getByText } = render(<App />);

  let count = getByText(/count is/);
  fireEvent.click(count);

  expect(count.textContent).toContain(1);
 });

 it('should reset increment count value', () => {
  const { getByText, rerender } = render(<App />);

  rerender(<App />);
  let count = getByText(/count is/);
  fireEvent.click(count);

  expect(count.textContent).toContain(1);
 });
```

The goal here is to run jest on the terminal now to see if the tests work the way they should.

Furthermore `ts-jest` have some issues which I highlighted in the beginning of this post that might save you some development time if you are aware forehand before using in any of your test. `ts-jest` will get better in the near future so I am not ruling that out.

The plan is to show how babel-jest improve on the complexity and difficulty inherent in using `ts-jest` with jest when writing tests.

if you are familiar with `git` and how it works then you can git commit your current version that uses the `ts-jest` and move to another branch before you start migrating to setup with babel-jest.

Here is the code to commit your changes and create a new branch.

```sh
git add .
git commit -m "writing test using `ts-jest`"
git checkout -b "babel-jest"
```

The reason I need to show `babel-jest` doing what `ts-jest` did in the earlier test is because of the incoherent version trouble with `ts-jest` which is just temporary depending on version upgrade and sometimes test coverage (jest --coverage) issues.

The following steps is something you can try on your own to migrate the current setup with `ts-jest` to `babel-jest`. If you don't have test written for you frontend app you can plan to write one. it increases your confidence.

* install the necessary babel packages

```sh{1}
yarn add -D @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript babel-jest
# add the @babel/plugin-transform-runtime to avoid the runtime error.
yarn add -D @babel/plugin-transform-runtime
# NB - this is optional depending on the case. I need to find out why sometimes I get the runtime error when using the `babel.config.js` with `babel-jest`.
```

* create the babel.config.js file

```js
module.exports = {
 presets: [
    '@babel/preset-env',
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
  plugins: ['@babel/plugin-transform-runtime'],
}
```

<blockquote>
  Before you run the test remove `ts-jest` related configs from the `jest.config.js`. You can do that using the image below to see how i commented out `ts-jest` related changes.
</blockquote>

* run the test 💥.it should work with less stress.

![Image showing the test passing](https://res.cloudinary.com/drnqdd87d/image/upload/v1627240142/Personal/Screenshot_2021-07-25_at_20.07.53.png)
<figcaption>Image showing the test passing</figcaption>

Below is the screenshot of the git diff with [delta](https://github.com/dandavison/delta).
![showing the git diff of the jest.config.js](https://res.cloudinary.com/drnqdd87d/image/upload/v1627239378/Personal/Screenshot_2021-07-25_at_19.55.54.png)
<figcaption>
  showing the git diff of the jest.config.js
</figcaption>

![showing the git diff of the package.json](https://res.cloudinary.com/drnqdd87d/image/upload/v1627239434/Personal/Screenshot_2021-07-25_at_19.56.45.png)
<figcaption>
  showing the git diff of the package.json
</figcaption>
