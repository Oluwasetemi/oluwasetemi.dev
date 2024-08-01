import {createGlobalStyle} from 'styled-components'

const Typography = createGlobalStyle`
  ${
    '' /* @font-face {
    font-family: FrenchFries;
    src: url(${font});
  }
  @font-face {
    font-family: 'adelle';
    src: url(${general});
    font-weight: lighter;
    font-style: normal;
  } */
  }
  .ibm-plex-mono-bold-italic {
    font-family: "IBM Plex Mono", monospace;
    font-weight: 700;
    font-style: italic;
  }

  .ibm-plex-mono-bold {
    font-family: "IBM Plex Mono", monospace;
    font-weight: 700;
    font-style: normal;
  }

  .ibm-plex-mono-semibold-italic {
    font-family: "IBM Plex Mono", monospace;
    font-weight: 600;
    font-style: italic;
  }

  .ibm-plex-mono-semibold {
    font-family: "IBM Plex Mono", monospace;
    font-weight: 600;
    font-style: normal;
  }

  .ibm-plex-mono-medium-italic {
    font-family: "IBM Plex Mono", monospace;
    font-weight: 500;
    font-style: italic;
  }

  .ibm-plex-mono-medium {
    font-family: "IBM Plex Mono", monospace;
    font-weight: 500;
    font-style: normal;
  }

  .ibm-plex-mono-regular-italic {
    font-family: "IBM Plex Mono", monospace;
    font-weight: 400;
    font-style: italic;
  }

  .ibm-plex-mono-regular {
    font-family: "IBM Plex Mono", monospace;
    font-weight: 400;
    font-style: normal;
  }

  .ibm-plex-mono-light-italic {
    font-family: "IBM Plex Mono", monospace;
    font-weight: 300;
    font-style: italic;
  }

  .ibm-plex-mono-light {
    font-family: "IBM Plex Mono", monospace;
    font-weight: 300;
    font-style: normal;
  }

  .ibm-plex-mono-extralight-italic {
    font-family: "IBM Plex Mono", monospace;
    font-weight: 200;
    font-style: italic;
  }

  .ibm-plex-mono-extralight {
    font-family: "IBM Plex Mono", monospace;
    font-weight: 200;
    font-style: normal;
  }

  .ibm-plex-mono-thin-italic {
    font-family: "IBM Plex Mono", monospace;
    font-weight: 100;
    font-style: italic;
  }

  .ibm-plex-mono-thin {
    font-family: "IBM Plex Mono", monospace;
    font-weight: 100;
    font-style: normal;
  }
  html {
    font-family: Lato, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: var(--black);
  }
  span, p, li {
    ${'' /* letter-spacing: 0.5px; */}
    ${'' /* font-family: adelle, sans-serif; */}
  }
  small {
    ${'' /* font-family: adelle, sans-serif; */}

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
    color: var(--black);
    background: var(--yellow);
    padding: 5px 2px 5px 2px;
    margin: 0;
    display: inline;
    line-height: 1;
    border-radius: 5px;
    font-family: "IBM Plex Mono", monospace;
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
    font-size: 1.1rem,
    font-family: "IBM Plex Mono", monospace,
  }
`

export default Typography
