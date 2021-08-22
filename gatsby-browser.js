/* eslint-disable react/jsx-props-no-spreading */
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import 'prismjs/plugins/command-line/prism-command-line.css'
import React from 'react'
import Layout from './src/components/Layout'
import './src/styles/theme.css'

// Logs when the client route changes
export const onRouteUpdate = ({ location, prevLocation }) => {
  console.log('new pathname', location.pathname)
  console.log('old pathname', prevLocation ? prevLocation.pathname : null)
}

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>
}
