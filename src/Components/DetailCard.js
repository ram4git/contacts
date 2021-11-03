import PropTypes from 'prop-types'
import React from 'react'
import { Text, View } from 'react-native'
import tailwind from 'tailwind-rn'
const DetailCard = ({ label, value, type }) => {
  if (!value) {
    return null
  }
  return (
    <View style={tailwind('w-full flex flex-col py-3 ')} testID={'detail-card'}>
      <Text
        testID={'detail-label'}
        style={tailwind('text-gray-500 uppercase text-xs font-bold pl-4')}
      >
        {label}
      </Text>
      <View
        style={tailwind(
          `py-2 ${type ? 'flex justify-between flex-row' : ''}  px-4`,
        )}
      >
        <Text
          testID={'detail-value'}
          style={tailwind('text-gray-700 font-bold')}
        >
          {value}
        </Text>
        {type ? (
          <Text testID={'detail-type'} style={tailwind('text-gray-400')}>
            {type}
          </Text>
        ) : null}
      </View>
    </View>
  )
}

DetailCard.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
}

DetailCard.defaultProps = {
  label: '',
  type: '',
  value: '',
}

export default DetailCard
