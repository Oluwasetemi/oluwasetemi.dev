import {Link} from 'gatsby'
import React from 'react'

function NotFoundPage() {
  return (
    <>
      <h1>Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist...</p>
      <Link to="/blog">
        <p>Check out my writing inside</p>
      </Link>
    </>
  )
}

export default NotFoundPage
