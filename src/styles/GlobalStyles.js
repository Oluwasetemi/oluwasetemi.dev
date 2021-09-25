import {createGlobalStyle} from 'styled-components'
// import stripes from '../assets/images/stripes.svg';

const GlobalStyles = createGlobalStyle`
  :root {
    --red: #FF4949;
    --black: #2E2E2E;
    --yellow: #ffc600;
    --white: #fff;
    --grey: #efefef;
    --color: #800080;

    --color-50: #ffe3f8;
    --color-100: #ffb2f0;
    --color-200: #ff80ea;
    --color-300: #fe4ee7;
    --color-400: #fe20e7;
    --color-500: #e50cd5;
    --color-600: #b204ac;
    --color-700: #80007f;
    --color-800: #4e0048;
    --color-900: #1d0018;
  }
  /* gatsby specific styles */
  #___gatsby,#gatsby-focus-wrapper {
    height: 100%;
    max-width: 100%;
    overflow: hidden;
  }

  html {
    background-size: 650px;
    background-attachment: fixed;
    font-size: 10px;
    scrollbar-width: auto;
    scrollbar-color: var(--color) var(--white);
  }

  body {
    font-size: 16px;
    line-height: 1.5;
  }

  fieldset {
    border-color: rgba(0,0,0,0.1);
    border-width: 1px;
  }

  button {
    color: var(--white);
    border: 1px solid var(--color);
    background: var(--color-400);
    ${'' /* border: 0; */}
    padding: 0.6rem 1rem;
    border-radius: 2px;
    cursor: pointer;
    --cast: 2px;
    box-shadow: var(--cast) var(--cast) 0 var(--grey);
    text-shadow: 0.5px 0.5px 0 rgba(0,0,0,0.2);
    transition: all 0.2s;

    &:hover {
      --cast: 6px;
    }
  }

   /* stylelint-disable value-no-vendor-prefix */
  .gatsby-image-wrapper img[src*=base64\\,] {
    image-rendering: -moz-crisp-edges;
    image-rendering: pixelated;
  }

  body::-webkit-scrollbar {
    width: 15px;
  }

  body::-webkit-scrollbar-track {
    background: var(--white);
  }
  body::-webkit-scrollbar-thumb {
    background-color: var(--color);
    border-radius: 6px;
    border: 3px solid var(--white);
  }

  hr {
    border: 0;
    height: 8px;
    background-size: 1500px;
  }

  img {
    max-width: 100%;
  }

  .tilt {
    transform: rotate(-2deg);
    position: relative;
    display: inline-block;
  }

 .link {
    color: #000;
    text-decoration: none;
    box-shadow: inset 0 -.5rem 0 #80008050;
    transition: 0.4s all ease-out;
  }

  .link:hover {
    box-shadow: inset 0 -1.7rem 0 #80008050;
  }

  a {
    color: var(--color);
  }

  blockquote {
    background: #f9f9f9;
    border-left: 10px solid #ccc;
    margin: 1.5em 10px;
    padding: 0.5em 10px;
    ${'' /* quotes: "\201C""\201D""\2018""\2019"; */}
  }

  blockquote::before {
    color: #ccc;
    content: open-quote;
    font-size: 4em;
    line-height: 0.1em;
    margin-right: 0.25em;
    vertical-align: -0.4em;
  }

  blockquote p {
    display: inline;
  }

  ${'' /* added for info */}
  .info {
    text-align: center;
    padding: 10px;
    background-color: var(--color-200);
    color: var(--black);
    font-weight: bold;
    letter-spacing: 2px;;
  }
`

export default GlobalStyles
