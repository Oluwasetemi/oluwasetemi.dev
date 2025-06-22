import {darken, lighten} from 'polished'
// import {fonts} from '../src/lib/typography'

const brand = {
  primary: '#800080',
  secondary: '#efefef',
}

const colors = {
  primary_light: `${lighten(0.55, brand.primary)}`,
  gray: '#efefef',
  black: '#2E2E2E',
  white: '#fff',
  bg_color: '#fafafa',
  body_color: '#222426',
  link_color: brand.primary,
  link_color_hover: `${darken(0.07, brand.primary)}`,
  red: '#FF4949',
  green: '#17A974',
  blue: '#327CDC',
  yellow: '#FFC600',
  purple: '#800080',
  purple_dark: '#1d0018',
}

const theme = {
  colors,
  // fonts,
  brand,
  breakpoints: {
    xs: '400px',
    s: '600px',
    m: '900px',
    l: '1200px',
  },
  container: {
    base: '100rem',
    text: '55rem',
  },
  spacer: {
    horizontal: '2rem',
    vertical: '3rem',
  },
  transition: {
    ease: 'all 100ms ease',
  },
}

export default theme
