import React from 'react';
import { rhythm } from '../utils/typography';


function Footer (props) {
    return (
      <footer
        style={{
          marginTop: rhythm(2.5),
          paddingTop: rhythm(1),
        }}
      >
        <div style={{ float: 'right' }}>
          <a href="/rss.xml" target="_blank" rel="noopener noreferrer">
            rss
          </a>
        </div>
        <a
          href="https://twitter.com/setemiojo"
          target="_blank"
          rel="noopener noreferrer"
        >
          twitter
        </a>{' '}
        &bull;{' '}
        <a
          href="https://github.com/Oluwasetemi"
          target="_blank"
          rel="noopener noreferrer"
        >
          github
        </a>{' '}
        &bull;{' '}
        <a
          href="https://codepen.io/setemiojo"
          target="_blank"
          rel="noopener noreferrer"
        >
          codepen
        </a>
      </footer>
    );
}

export default Footer;