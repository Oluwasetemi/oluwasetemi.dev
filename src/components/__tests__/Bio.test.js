import {render} from '@testing-library/react'
import React from 'react'

function Hello() {
  return (
    <div>
      <h1>Hello</h1>
    </div>
  )
}

test('render the Bio', () => {
  render(<Hello />)
})
