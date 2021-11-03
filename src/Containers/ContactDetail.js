import DetailCard from '@/Components/DetailCard'
import { actions } from '@/Store'
import { formatPhoneNumber } from '@/utils'
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { FlatList, Image, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import tailwind from 'tailwind-rn'

const ContactDetail = ({ navigation, route }) => {
  const [hasImageLoadFailed, setHasImageLoadFailed] = useState(false)

  const dispatch = useDispatch()

  useFocusEffect(
    useCallback(() => {
      dispatch({ type: actions.SET_CURRENT_CONTACT, contact: route?.params })
      return () => dispatch({ type: actions.SET_CURRENT_CONTACT, contact: {} })
    }, [dispatch, route?.params]),
  )

  const contactData = route?.params ?? {}
  const { name = '', largeImageURL, companyName = '' } = contactData

  const onImageLoadFailure = () => setHasImageLoadFailed(true)
  const HeroSection = () => (
    <View style={tailwind('flex flex-col items-center py-4')}>
      <Image
        style={[
          tailwind('w-4/12 rounded-sm mx-4 my-2 flex-grow-0'),
          { aspectRatio: 1 / 1 },
        ]}
        source={
          hasImageLoadFailed
            ? require('../Assets/Images/UserLarge/UserLarge.png')
            : { uri: largeImageURL }
        }
        resizeMode="cover"
        onError={onImageLoadFailure}
      />
      <Text style={tailwind('text-lg font-bold text-gray-700')}>{name}</Text>
      {companyName ? (
        <Text style={tailwind('text-gray-600')}>{companyName}</Text>
      ) : null}
    </View>
  )

  const renderDetail = ({ item }) => <DetailCard {...item} />

  const DetailSection = () => {
    const { phone = {}, address = null, birthday, emailAddress } = contactData
    const details = []
    Object.keys(phone).forEach(key => {
      const phoneNumber = phone[key]
      if (phoneNumber) {
        details.push({
          label: 'phone',
          value: formatPhoneNumber(phone[key]),
          type: key,
        })
      }
    })

    if (address) {
      details.push({
        label: 'Address',
        value: (
          <View>
            <Text
              style={tailwind('text-gray-700 font-bold')}
            >{`${address.street}`}</Text>
            <Text
              style={tailwind('text-gray-700 font-bold')}
            >{`${address.city}, ${address.state} ${address.zipCode}, ${address.country} `}</Text>
          </View>
        ),
      })
    }

    if (birthday) {
      details.push({
        label: 'Birthday',
        value: birthday,
      })
    }

    if (emailAddress) {
      details.push({
        label: 'email',
        value: 'irraju@gmail.com',
      })
    }

    return (
      <FlatList
        data={details}
        renderItem={renderDetail}
        ItemSeparatorComponent={() => (
          <View style={tailwind('flex items-center')}>
            <View style={[tailwind('w-11/12 h-0.5 bg-gray-200')]} />
          </View>
        )}
        scrollEnabled={false}
      />
    )
  }

  return (
    <View
      style={[
        tailwind('flex-1'),
        { overflow: 'scroll', showsVerticalScrollIndicator: false },
      ]}
      bounces={false}
    >
      <HeroSection />
      <DetailSection />
    </View>
  )
}

export default ContactDetail
