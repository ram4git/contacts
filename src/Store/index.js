import { configureStore } from '@reduxjs/toolkit'

const actions = {
  SET_CONTACTS: 'SET_CONTACTS',
  SET_CURRENT_CONTACT: 'SET_CURRENT_CONTACT',
  TOGGLE_FAVORITE: 'TOGGLE_FAVORITE',
  SET_ERROR: 'SET_ERROR',
  MARK_FINISHED_FETCH: 'MARK_FINISHED_FETCH',
}

const initialState = {
  contacts: [],
  currentContact: {},
  isLoading: true,
  error: null,
}

function contactsReducer(state = initialState, action) {
  console.log({ action })
  switch (action.type) {
    case actions.SET_CONTACTS: {
      return { ...state, contacts: action.contacts }
    }
    case actions.SET_CURRENT_CONTACT: {
      return { ...state, currentContact: action.contact }
    }
    case actions.SET_ERROR: {
      return { ...state, error: action.error }
    }
    case actions.MARK_FINISHED_FETCH: {
      return { ...state, isLoading: false }
    }
    case actions.TOGGLE_FAVORITE: {
      const newCurrentContact = { ...state.currentContact }
      newCurrentContact.isFavorite = !newCurrentContact.isFavorite
      const newContacts = state.contacts.map(i =>
        i.id === action.id ? newCurrentContact : i,
      )
      return {
        ...state,
        contacts: newContacts,
        currentContact: newCurrentContact,
      }
    }

    default:
      return state
  }
}

const store = configureStore({
  reducer: contactsReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = []

    if (__DEV__ && !process.env.JEST_WORKER_ID) {
      const createDebugger = require('redux-flipper').default
      middlewares.push(createDebugger())
    }

    return middlewares
  },
})

export { store, actions }
