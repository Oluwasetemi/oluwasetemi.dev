import { Link } from 'gatsby'
import React from 'react'

function Nav({ title }) {
  return (
    <div>
      <h1
        style={{
          marginBottom: '50px',
          marginTop: 0,
          color: '#800080',
        }}
      >
        <Link
          style={{
            boxShadow: 'none',
            textDecoration: 'none',
            color: 'inherit',
          }}
          to="/"
        >
          {title}
        </Link>
      </h1>
    </div>
  )
}

export default Nav
