import { it } from '@jest/globals'
import { render } from '@testing-library/react-native'
import React from 'react'
import 'react-native'
import ContactCard from '../src/Components/ContactCard'

describe('Contact Card', () => {
  it('renders correctly with all props', () => {
    const { getByText, getByTestId } = render(
      <ContactCard
        imgUrl="https://s3.amazonaws.com/technical-challenge/v3/images/scooby-doo-small.jpeg"
        name="Jane Doe"
        title="Engineer"
        isFavorite={true}
      />,
    )
    const nameText = getByText('Jane Doe')
    const titleText = getByText('Engineer')
    const favIcon = getByTestId('fav-icon')
    expect(nameText).not.toBeNull()
    expect(titleText).not.toBeNull()
    expect(favIcon).not.toBeNull()
  })

  it('fav icon wont show up for non favorites', () => {
    const { queryByTestId } = render(
      <ContactCard
        imgUrl="https://s3.amazonaws.com/technical-challenge/v3/images/scooby-doo-small.jpeg"
        name="Jane Doe"
        title="Engineer"
        isFavorite={false}
      />,
    )
    const favIcon = queryByTestId('fav-icon')
    expect(favIcon).toBeNull()
  })

  it('company name  wont show up when absent', () => {
    const { queryByTestId } = render(
      <ContactCard
        imgUrl="https://s3.amazonaws.com/technical-challenge/v3/images/scooby-doo-small.jpeg"
        name="Jane Doe"
        isFavorite={false}
      />,
    )
    const companyNameEl = queryByTestId('contact-title')
    expect(companyNameEl).toBeNull()
  })

  it('default image loads up when imgUrl is absent', () => {
    const { queryByTestId } = render(
      <ContactCard name="Jane Doe" isFavorite={false} />,
    )
    const smallThumbnailEl = queryByTestId('thumb-img')
    expect(smallThumbnailEl).not.toBeNull()
  })
})
