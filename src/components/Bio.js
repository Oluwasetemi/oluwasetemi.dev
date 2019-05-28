import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import profilePic from '../assets/profile-pic.jpg'
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
            <a className="link" href="https://github.com/Oluwasetemi">Oluwasetemi Ojo Stephen</a> {'...OOS'}
          </strong> Relocated to Lagos, Nigeria.🎈{' '}
          <a className="link" href="https://mobile.twitter.com/setemiojo">
            Say Hi to  Him on Twitter.
          </a>
          <br />
          {' '}
          <a className="link" href="/rss.xml">RSS feed</a>
        </p>
      </div>
    )
  }
}

export default Bio
