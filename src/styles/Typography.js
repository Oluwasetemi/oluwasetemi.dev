import { createGlobalStyle } from 'styled-components'
import general from '../assets/fonts/Adelle_LightItalic.otf'
import font from '../assets/fonts/frenchfries.woff'

const Typography = createGlobalStyle`
  @font-face {
    font-family: FrenchFries;
    src: url(${font});
  }
  @font-face {
    font-family: 'adelle';
    src: url(${general});
    font-weight: lighter;
    font-style: normal;
  }
  html {
    font-family: FrenchFries, 'adelle', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: var(--black);
  }
  span, p, li {
    letter-spacing: 0.5px;
    font-family: 'adelle';
  }
  small {
    font-family: 'adelle';

  }
  h1,h2,h3,h4,h5,h6 {
    font-weight: normal;
    margin: 0;
  }
  a {
    color: var(--colors);
    text-decoration-color: var(--red);
    /* Chrome renders this weird with this font, so we turn it off */
    text-decoration-skip-ink: none;
    ${'' /* text-decoration-thickness: 3px; */}
  }
  mark, .mark {
    background: var(--yellow);
    padding: 5px 2px 5px 2px;
    margin: 0;
    display: inline;
    line-height: 1;
    border-radius: 5px;
  }

  .center {
    text-align: center;
  }

  .tilt {
    transform: rotate(-2deg);
  }

  a.gatsby-resp-image-link: {
    boxShadow: 'none',
  }

  p code: {
    fontSize: 1.1rem,
  }
`

export default Typography
