import { createGlobalStyle } from 'styled-components'
// import stripes from '../assets/images/stripes.svg';

const GlobalStyles = createGlobalStyle`
  :root {
    --red: #FF4949;
    --black: #2E2E2E;
    --yellow: #ffc600;
    --white: #fff;
    --grey: #efefef;
    --color: #800080;
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
  }

  body {
    font-size: 2rem;
    line-height: 1.5;
  }

  fieldset {
    border-color: rgba(0,0,0,0.1);
    border-width: 1px;
  }

  button {
    background: var(--red);
    color: white;
    border: 0;
    padding: 0.6rem 1rem;
    border-radius: 2px;
    cursor: pointer;
    --cast: 2px;
    box-shadow: var(--cast) var(--cast) 0 var(--grey);
    text-shadow: 0.5px 0.5px 0 rgba(0,0,0,0.2);
    transition: all 0.2s;
    &:hover {
      --cast: 4px;
    }
  }

  .gatsby-image-wrapper img[src*=base64\\,] {
    image-rendering: -moz-crisp-edges;
    image-rendering: pixelated;
  }

  /* Scrollbar Styles */
  body::-webkit-scrollbar {
    width: 15px;
  }
  html {
    scrollbar-width: auto;
    scrollbar-color: var(--color) var(--white);
  }
  body::-webkit-scrollbar-track {
    background: var(--white);
  }
  body::-webkit-scrollbar-thumb {
    background-color: var(--color) ;
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

  /* TODO: switch to Style components
  style the link tag in the bio
  */

 .link {
    color: #000;
    text-decoration: none;
    /* border-bottom: 3px solid #80008050; */
    box-shadow: inset 0 -.5rem 0 #80008050;
    transition: 0.4s all ease-out;
  }

  .link:hover {
    box-shadow: inset 0 -1.7rem 0 #80008050;
  }

  a {
    color: var(--color);
  }

`

export default GlobalStyles
