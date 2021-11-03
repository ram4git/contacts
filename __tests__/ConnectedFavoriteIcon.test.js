import { it } from '@jest/globals'
import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import 'react-native'
import { Provider } from 'react-redux'
import ConnectedFavoriteIcon from '../src/Components/ConnectedFavoriteIcon'
import { actions, store } from '../src/Store'

console.log({ store })
describe('Navigator', () => {
  it('renders properly and inactive favorite icon by default', () => {
    const { queryByTestId, debug } = render(
      <Provider store={store}>
        <ConnectedFavoriteIcon />
      </Provider>,
    )
    debug()
    const favIconEl = queryByTestId('fav-icon-inactive')
    expect(favIconEl).not.toBeNull()
  })

  it('favorite color renders properly and toggles when pressed', () => {
    store.dispatch({
      type: actions.SET_CURRENT_CONTACT,
      contact: { id: '16', isFavorite: true },
    })

    const { queryByTestId, debug } = render(
      <Provider store={store}>
        <ConnectedFavoriteIcon />
      </Provider>,
    )
    const favIconEl = queryByTestId('fav-icon-active')
    expect(favIconEl).not.toBeNull()
    const favIconTouchableEl = queryByTestId('fav-icon-container')
    expect(favIconTouchableEl).not.toBeNull()

    fireEvent.press(favIconTouchableEl, { pressable: true })
    expect(store.getState().currentContact).toMatchObject({
      id: '16',
      isFavorite: false,
    })
  })

  it('favoriting contact changes global favorites', () => {
    store.dispatch({
      type: actions.SET_CONTACTS,
      contacts: [
        { id: '16', isFavorite: true },
        { id: '17', isFavorite: false },
      ],
    })
    store.dispatch({
      type: actions.SET_CURRENT_CONTACT,
      contact: { id: '17', isFavorite: false },
    })

    const { queryByTestId, debug } = render(
      <Provider store={store}>
        <ConnectedFavoriteIcon />
      </Provider>,
    )
    const favIconEl = queryByTestId('fav-icon-inactive')
    expect(favIconEl).not.toBeNull()
    const favIconTouchableEl = queryByTestId('fav-icon-container')
    expect(favIconTouchableEl).not.toBeNull()

    fireEvent.press(favIconTouchableEl, { pressable: true })
    expect(store.getState().currentContact).toMatchObject({
      id: '17',
      isFavorite: true,
    })

    expect(store.getState().contacts.find(d => d.id === '17')).toMatchObject({
      id: '17',
      isFavorite: true,
    })
  })
})
