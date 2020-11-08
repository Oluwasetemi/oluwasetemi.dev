/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import Layout from './src/components/Layout'
import './src/utils/theme.css'

// Logs when the client route changes
export const onRouteUpdate = ({ location, prevLocation }) => {
  console.log('new pathname', location.pathname)
  console.log('old pathname', prevLocation ? prevLocation.pathname : null)
}

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>
}
