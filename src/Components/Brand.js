import PropTypes from 'prop-types'
import React from 'react'
import { Image, Text, View } from 'react-native'
import tailwind from 'tailwind-rn'

const Brand = ({ height, width, mode }) => {
  return (
    <View style={{ height, width }}>
      <Image
        style={tailwind('h-full w-full')}
        source={require('../Assets/Images/logo.png')}
        resizeMode={mode}
      />
      <Text
        style={tailwind(
          'text-2xl text-center font-black text-purple-800 -mt-8',
        )}
      >
        KIN + CARTA
      </Text>
    </View>
  )
}

Brand.propTypes = {
  height: PropTypes.number,
  mode: PropTypes.oneOf(['contain', 'cover', 'stretch', 'repeat', 'center']),
  width: PropTypes.number,
}

Brand.defaultProps = {
  height: 200,
  mode: 'contain',
  width: 200,
}

export default Brand
