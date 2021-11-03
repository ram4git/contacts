/**
 * @format
 */
import { render } from '@testing-library/react-native'
import React from 'react'
import App from '../src/App'

// // Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer'

describe.only('App', () => {
  it('App renders correctly', () => {
    const { getByText, debug } = render(<App />)
  })
})
