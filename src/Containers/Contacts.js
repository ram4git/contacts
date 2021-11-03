import { Brand, ContactCard } from '@/Components'
import { Routes } from '@/Navigators/Application'
import { navigate } from '@/Navigators/utils'
import { sortAlphabetically } from '@/utils'
import React from 'react'
import {
  ActivityIndicator,
  SectionList,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { useSelector } from 'react-redux'
import tailwind from 'tailwind-rn'

const Contacts = () => {
  const contacts = useSelector(state => state.contacts)
  const isLoading = useSelector(state => state.isLoading)
  const error = useSelector(state => state.error)
  const currentContact = useSelector(state => state.currentContact)

  if (isLoading) {
    return (
      <View style={tailwind('flex-1 flex-col justify-center items-center')}>
        <Brand />
        <ActivityIndicator size={'large'} style={tailwind('mx-16 py-8')} />
        <Text style={tailwind('text-center')}>fetching contacts...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={tailwind('flex-1 flex-col justify-center bg-yellow-500')}>
        <Text style={tailwind('text-4xl text-center')}>⚠️</Text>
        <Text style={tailwind('text-2xl text-center font-bold text-red-700')}>
          We are sorry!
        </Text>
        <Text style={tailwind('px-8 text-sm font-light pt-4')}>
          There was a problem fetching the contacts. Please try again after a
          while or contact support!
        </Text>
      </View>
    )
  }

  const renderContactCard = ({ item }) => (
    <TouchableOpacity onPress={() => navigate(Routes.CONTACT_DETAILS, item)}>
      <ContactCard
        name={item.name}
        title={item.companyName}
        isFavorite={item.isFavorite}
        imgUrl={item.smallImageURL}
      />
    </TouchableOpacity>
  )

  return (
    <View style={tailwind('flex-1')}>
      <SectionList
        sections={[
          {
            type: 'Favorite Contacts',
            data: contacts
              .filter(d => d.isFavorite)
              .sort(sortAlphabetically('name')),
          },
          {
            type: 'Other Contacts',
            data: contacts
              .filter(d => !d.isFavorite)
              .sort(sortAlphabetically('name')),
          },
        ]}
        keyExtractor={(item, index) => index}
        renderItem={({ item, section }) => {
          return section.type ? renderContactCard({ item }) : null
        }}
        ItemSeparatorComponent={() => (
          <View style={tailwind('flex items-center')}>
            <View style={[tailwind('w-11/12 h-0.5 bg-gray-200')]} />
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <Text
            style={tailwind(
              'uppercase text-sm pl-2 py-1 font-bold text-gray-900 bg-gray-200',
            )}
          >
            {section.type}
          </Text>
        )}
      />
    </View>
  )
}

export default Contacts
