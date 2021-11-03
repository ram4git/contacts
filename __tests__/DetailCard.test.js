import { it } from '@jest/globals'
import { render } from '@testing-library/react-native'
import React from 'react'
import 'react-native'
import DetailCard from '../src/Components/DetailCard'

describe('Detail Card', () => {
  it('renders correctly with all props', () => {
    const { getByText } = render(
      <DetailCard label="primary phone" value="1231231234" type="mobile" />,
    )
    const labelText = getByText('primary phone')
    const valueText = getByText('1231231234')
    const typeText = getByText('mobile')
    expect(labelText).not.toBeNull()
    expect(valueText).not.toBeNull()
    expect(typeText).not.toBeNull()
  })

  it('type lable wont show up when not passed', () => {
    const { queryByTestId } = render(
      <DetailCard label="primary phone" value="1231231234" />,
    )
    const detailEl = queryByTestId('detail-type')
    expect(detailEl).toBeNull()
  })

  it('empty case', () => {
    const { queryByTestId, debug } = render(<DetailCard />)
    debug()
    const cardEl = queryByTestId('detail-card')
    expect(cardEl).toBeNull()
  })
})
