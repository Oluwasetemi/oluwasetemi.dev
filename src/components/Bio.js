import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import profilePic from './profile-pic.jpg'
import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
        }}
      >
        <img
          src={profilePic}
          alt={`Ojo Oluwasetemi`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
            borderRadius: '50%',
          }}
        />
        <p>
          Written by {' '}
          <strong>
            <a href="https://github.com/Oluwasetemi">Ojo Oluwasetemi Stephen</a> {'...OOS'}
          </strong> who lives and works in Ibadan, Nigeria.{' '}
          <a href="https://mobile.twitter.com/setemiojo">
            Say Hi to  Him on Twitter.
          </a>
          <br />
          {' '}
          <a href="/rss.xml">RSS feed</a>
        </p>
      </div>
    )
  }
}

export default Bio
