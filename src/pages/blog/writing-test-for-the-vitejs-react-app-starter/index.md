---
title: Writing test for the vitejs react app starter
date: '2021-08-17T23:01:05.977Z'
tags: ['test', 'react', 'javascript']
isPublished: true
isDraft: false
---

Thinking of a better way to start your new project with react and write test? I have a solution for you using the [Vitejs React Starter App](https://vitejs.dev/guide/#scaffolding-your-first-vite-project). I will walk you through a set of test that I think the [vitejs](https://vitejs.dev/guide/#scaffolding-your-first-vite-project) scaffold should come with my default.

## Technical Requirement

This tutorial assumes the reader has the following:

1. [Node](https://nodejs.org/en/) >= 12.0.0 installed on their computer.
2. [Yarn](https://yarnpkg.com/) or any other equivalent like [npm](https://www.npmjs.com) or [npx](https://www.npmjs.com/package/npx) or [pnpm](https://pnpm.io/) installed.
3. A good knowledge of [React](https://reactjs.org)
4. Interest in writing [tests for react apps](https://reactjs.org/docs/testing.html)

Just the way the [create react app(CRA)](https://www.youtube.com/watch?v=eCz3rhsDG5s) comes with a simple test I wish the vitejs app comes with a default test and setup. Not anything special just a way to be prepared anytime you create a react app with vitejs, more so it creation is brilliant to not include test and test setup. It will be of great advantage to anyone building apps with the starters to have test include. It will be a way to see writing test as part of the journey of the product they are building.

```jsx
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);

  const linkElement = screen.getByText(/learn react/i);

  expect(linkElement).toBeInTheDocument();
});
```

<figcaption>a <a href="https://gist.github.com/Oluwasetemi/626fcd9939e12458dd8732292f772440">gist</a> showing test sample of the popular create react app</figcaption><br/>

## Here's why I always write test

I am always delighted to write tests for any software I build. From unit to end to end tests, it is very important to see your app from the functional view. Writing tests help with the ultimate goal of keeping the app functional at all times again unwanted bugs.

## Benefits of writing well-tested apps

For instance I have a todo app right and anytime you create a new todo item, it adds 2 new todo items, you know right that is a bug and should be fixed. Again I have another app that generates lot of money in revenue and anytime this app fails you lose money and resource some way, then it will be my job as the developer to make sure the app is working properly.

Another interesting angle to see it from is imagine the todo app you built previously and you intend to add a new feature to the product. We call it sub-todos that is - a todo may have its todo items. After adding the new feature the whole product falls apart and you cannot figure out why - Writing test will pass a level of confidence that helps you to know that the previous functionalities in the todo app work correctly and you might have to check the code that handles the sub todo feature and write some test to figure out where the problem lies.

Writing tests comes with lot of benefit but that is not my aim with this writeup. What I want to share with you is Writing a simple and functional test for the vitejs react starter app.

## Understanding the problem and writing our first test

What does the basic vitejs app do? it shows the react logo spinning carefully and it shows a counter. It displays certain text as well. The counter functionality - must increment by one.

We will start by creating a basic vitejs react app. I will be doing this on a mac laptop using [vs code](https://code.visualstudio.com/) as the code editor and zsh terminal styled with [oh-my-zsh](https://ohmyz.sh/) and [starship](https://starship.rs/).
To create a react project with vitejs, all you need to do is to copy and paste this in your vscode terminal or command line or any terminal utility.

```shell
# react-app will be the name of the project
# I prefer yarn but if you like npm just replace yarn with the equivalent npm command.
yarn create @vitejs/app react-app --template react-ts

# latter version of vite
yarn create vite
# follow the prompt

# or run this if you use npm
npm init vite@latest
```

In a no time depending on your [internet speed](https://fast.com) you will have a project setup for you. Change directory into the new created app and run the yarn command to install the project dependencies with just `yarn` or `npm install` and start the app in dev mode using `yarn dev` or `npm run dev`.

```shell
# cd into the folder/project
cd react-app
# run npm install or yarn to install the dependencies
yarn
# run the npm run dev or yarn dev to start the dev server
yarn dev
```

You should have an app running in your browser on the url <https://localhost:3000> and if you do not have the app running, check your terminal for any error message to debug. In case the opening of the url automatically did not work for you, you may <kbd>Ctrl/CMD</kbd> click on the url link in your terminal or  attempt to open your the url in the browser by yourself. If you have a simple react interface - Good, but if not,  try to go through the steps again and carefully follow through till you have the desired result if not contact me :).

![Default Vite App](https://res.cloudinary.com/drnqdd87d/image/upload/v1627035711/Personal/vite-default_yfbtrv.png)

You should have a react app running and we can write test for this starter, I will run the tests using
[jest](https://jestjs.io) and before we start writing the test I need to set it up to understand jsx. I need to install a few babel packages like `@babel/core`, `@babel/preset-env`, `@babel/preset-react` and maybe `babel-jest`. Create a `babel.config.js` file in the root folder and put in some configurations. majorly it should have a `module.exports = {}`. The empty object should have a presets key with the value of and array `presets: []`. The array should contain strings as values, this string should be the babel package we have installed previously `presets: ['@babel/preset-env', '@babel/react']`. In the end everything should look like this.

```javascript
module.exports = {
 presets: [
    '@babel/preset-env',
    '@babel/preset-react',
  ],
}
```

To confirm that this is working correctly we should create a folder for our test and write a sample test.Let the name of the folder be `__tests__` and the file should be `simple.spec.js`. If you're not familiar with what tests are and how they work you can look for an introductory guide on how to write test which is beyond the scope of this write up. A simple test will look like a `test` or `it` function called with a string representing the name of the test and a callback function with either the traditional function or an arrow function. In code it looks like this.

```javascript
test('a simple test', function() {
  // content of our test with here
})

it('a simple test with arrow function', () => {
  // content of our test with here
})
```

try to run this with a `jest` in your terminal and you will see the test report showing the details of the test you just ran.

### Using @testing-library/react

Furthermore it will be good to note that our test will done using @testing-library/react supported with some extra test matcher from our package [@testing-library/jest-dom](https://github.com/testing-library/jest-dom). This two packages makes writing test significantly less burdensome.

```shell
yarn add @testing-library/react @testing-library/jest-dom
```

## Complete test using Arrange Act and Assert

My first test will check if some key element appears in the rendered app. The testing library has a render api that takes the App and renders it just like the dom will render it. The api exposes some utilities that you can call to extract information from the rendered App. I choose to use `getByText`, [for more around the queries returned by the render method.](https://testing-library.com/docs/queries/about) It queries the dom just like the [querySelector API](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) and search for the element that has the text `count is`. There and then we can now make an assertion using the expect library exposed from jest. Another important thing is the `toBeInTheDocument` matcher which comes from the jest-dom package whose work it is to confirm if the element that will be return by the `getByText` query is in the render document. It should look like:

```jsx
it('should renders app properly', () => {
    const { getByText } = render(<App />);

    const count = getByText(/count is/);
    const react = getByText(/learn react/i);
    const vite = getByText(/hello vite/i);

    expect(count).toBeInTheDocument();
    expect(react).toBeInTheDocument();
    expect(vite).toBeInTheDocument();
});
```

Moreover I will test the counter implementation in the starter. To test the counter implementation, I have to assert that the counter load with 0 value. Following the same step from the previous step. Render the App, query the return rendered App with the `getByText` and assert using the expect api with a matcher from the `jest-dom` package `toHaveTextContent`. `toHaveTextContent` will check if the text content of the element return contain 0. The code will look like this:

```jsx
it('should have a count value of 0 when app loads', () => {
    const { getByText } = render(<App />);

    const count = getByText(/count is/);

    expect(count).toHaveTextContent(0);
    expect(count.textContent).toContain('0');
});
```

Building on the last test I can test the increment button if it work properly. Testing this functionality will have me test some real functionalities like clicking a button. Thanks to the beauty testing-library we are using. We can fire a click event using the `[fireEvent](https://testing-library.com/docs/dom-testing-library/api-events)` api. Fire a click event on the button after rendering the App. Our button can only be clicked after it has been queried using the `getByText` query to locate the button. We assert the value after firing the click event. Read more about the events the `fireEvent` api support and for more information on event use the [user-event](https://testing-library.com/docs/ecosystem-user-event) or [react-select-event](https://testing-library.com/docs/ecosystem-react-select-event). Assert that the value of the counter has increased by 1.

```jsx
 it('should increment count value', () => {
    const { getByText } = render(<App />);
    const count = getByText(/count is/);

    fireEvent.click(count);

    expect(count).toHaveTextContent(1);
    expect(count.textContent).toContain('1');
});
```

We can also try to rerender the App since react also does this very well when we have some level of changes in our App. To test the App re-render properly. The re-render should reset the counter value to 0. We will build on all we have been writing by rendering our App using the `render` api. react testing library exposes a rerender api which can be called almost instantly after the render. fire a click event on the button you query from `getByText` - queries the Document Object Model (DOM) for any thing with the text name `/count is/`. The essence of the forward slash is to use the regex option of the `getByText` query. Assert that the value of the counter has been increased by just one.

```jsx{numberLines: true}
it('should reset increment count value', () => {
    const { getByText, rerender } = render(<App />);
    rerender(<App />);
    const count = getByText(/count is/);

    fireEvent.click(count);

    expect(count).toHaveTextContent(1);
    expect(count.textContent).toContain('1');
});
```

This is my attempt to write test for the vitejs react app starter. Maybe I should submit a PR for the vitejs react starter app.

To run the test enter jest into the terminal and the test result and summary. We can take it further with test coverage analysis, implementation of snapshots and a lot more.

## Summary

I know that you will give writing test its importance in your next project moreover this starter will be a template for you react app tests.

<hr />

I hope this article was enlightening. If so, share this article and follow [@setemiojo](https://twitter.com/setemiojo) on Twitter.

## Update

> [The more your tests resemble the way your software is used, the more confidence they can give you.](https://testing-library.com/docs/guiding-principles)

> [I don't think that anyone can argue that testing software is a waste of time. The biggest challenge is knowing what to test and how to test it in a way that gives true confidence rather than the false confidence of testing implementation details.](https://kentcdodds.com/blog/write-tests#conclusion)

The two quotes are from [Kent C Dodds](https://kentcdodds.com/). I am a good fan. His love for testing has been the source of my knowledge and I agree with the two principles certainly. I call it writing **effective tests**. This made me do some adjustment to the test I have written for the App above. These are the few changes to note:

* Made the test to resemble the way the app will be used:
    1. App loads - `render(<App />`
    2. User interact and find the counter button -`screen.getByRole('button', { name: /count/i })` and `fireEvent.click(count)`
    3. User assert that the value of the counter has increased by one - `expect(count.textContent).toContain('1') or expect(count).toHaveTextContent(1)`

* Spotted a bug in the test case that says `should reset increment count value`.
    1. Renamed the test case to `rerender <App /> should not change the value of counter`. When an app renders it should not loose its state in React. I implemented the test with the understanding that the value of the state should reset during rerender.(App rerenders  when passed new prop values or context value is updated or A life-cycle update with useEffect)
    2. The test above was not effective considering the two principles above. Below is a better version of the last test,  [for full test re-implemention check GitHub](https://github.com/Oluwasetemi/migrate-series/blob/default-test/src/__tests__/App.spec.tsx) - PS: press . to see a new GitHub magic of vscode in browser :

```jsx
import {screen, fireEvent, render} from '@testing-library/react' ;

it('rerender <App /> should not change the value of counter', () => {
    const { rerender } = render(<App />);
    let count = screen.getByRole('button', { name: /count is/i });

    fireEvent.click(count);

    expect(count.textContent).toContain(1);

    rerender(<App />);
    
    expect(count.textContent).toContain(1);

    fireEvent.click(count);

    expect(count.textContent).toContain(2);
});
```
 [For the full changes to all the test check it on GitHub](https://github.com/Oluwasetemi/migrate-series/blob/default-test/src/__tests__/App.spec.tsx).

Check the default-test branch of this [repo](https://github.com/Oluwasetemi/migrate-series/blob/default-test/).
