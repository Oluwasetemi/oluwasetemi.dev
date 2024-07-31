/* eslint-disable react/jsx-props-no-spreading */
import 'prismjs/plugins/command-line/prism-command-line.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import React from 'react'
import Layout from './src/components/Layout'
import './src/styles/theme.css'

export function wrapPageElement({element, props}) {
  return <Layout {...props}>{element}</Layout>
}
