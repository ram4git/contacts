import ApplicationNavigator from '@/Navigators/Application'
import { store } from '@/Store'
import React from 'react'
import 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import ErrorBoundary from './Containers/ErrorBoundary'

const App = () => (
  <ErrorBoundary>
    <Provider store={store}>
      <ApplicationNavigator />
    </Provider>
  </ErrorBoundary>
)

export default App
