import ConnectedFavoriteIcon from '@/Components/ConnectedFavoriteIcon'
import { Config } from '@/Config'
import { ContactDetail, Contacts } from '@/Containers'
import { actions } from '@/Store'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { useDispatch } from 'react-redux'
import tailwind from 'tailwind-rn'
import { navigationRef } from './utils'

const Stack = createStackNavigator()

const Routes = {
  CONTACTS: 'Contacts',
  CONTACT_DETAILS: 'ContactDetail',
}

// @refresh reset
const ApplicationNavigator = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    fetch(Config.API_URL)
      .then(r => r.json())
      .then(d => {
        dispatch({ type: actions.SET_CONTACTS, contacts: d })
      })
      .catch(e => dispatch({ type: actions.SET_ERROR, error: e }))
      .finally(() => dispatch({ type: actions.MARK_FINISHED_FETCH }))
  }, [dispatch])

  return (
    <SafeAreaView style={tailwind('flex-1')}>
      <NavigationContainer ref={navigationRef}>
        <StatusBar barStyle="light-content" />
        <Stack.Navigator
          initialRouteName={Routes.CONTACTS}
          screenOptions={{
            headerShown: true,
            headerTintColor: '#686de0',
          }}
        >
          <Stack.Screen
            name={Routes.CONTACTS}
            component={Contacts}
            options={{
              title: Routes.CONTACTS,
            }}
          />
          <Stack.Screen
            name={Routes.CONTACT_DETAILS}
            component={ContactDetail}
            options={{
              title: null,
              headerRight: () => <ConnectedFavoriteIcon />,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default ApplicationNavigator
export { Routes }
