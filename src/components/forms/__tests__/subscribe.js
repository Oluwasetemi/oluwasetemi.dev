/* eslint-disable jest/no-disabled-tests */
import { render, screen } from '@testing-library/react'
import * as React from 'react'
import Subscribe from '../subscribe'

test.skip('subscribe renders first name and email', () => {
  render(<Subscribe />)

  expect(screen.getByLabelText(/first name/i)).toBeDefined()
  expect(screen.getByLabelText(/email/i)).toBeDefined()
})
