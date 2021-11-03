import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Image, Text, View } from 'react-native'
import { SvgXml } from 'react-native-svg'
import tailwind from 'tailwind-rn'
import StarIcon from '../Assets/svgs/star.svg'
const ContactCard = ({ imgUrl, name, title, isFavorite }) => {
  const [hasImageLoadFailed, setHasImageLoadFailed] = useState(false)
  const onImageLoadFailure = () => setHasImageLoadFailed(true)

  return (
    <View style={tailwind('w-full h-24 flex flex-row py-2')}>
      <Image
        testID={'thumb-img'}
        style={tailwind('h-16 w-16 rounded-sm mx-4 my-2 flex-grow-0')}
        source={
          hasImageLoadFailed
            ? require('../Assets/Images/UserSmall/UserIconSmall.png')
            : { uri: imgUrl }
        }
        resizeMode="cover"
        onError={onImageLoadFailure}
      />
      <View style={tailwind('pl-4 py-2 flex-grow relative ')}>
        {isFavorite ? (
          <SvgXml
            testID={'fav-icon'}
            xml={StarIcon}
            width={16}
            height={16}
            style={[
              tailwind('pr-4 mr-4 text-yellow-500 absolute -left-1 top-4'),
            ]}
          />
        ) : null}
        <Text
          testID={'contact-name'}
          style={tailwind('text-lg font-bold text-gray-800')}
        >
          {name}
        </Text>
        {title ? (
          <Text testID={'contact-title'} style={tailwind('text-gray-600')}>
            {title}
          </Text>
        ) : null}
      </View>
    </View>
  )
}

ContactCard.propTypes = {
  imgUrl: PropTypes.string,
  isFavorite: PropTypes.bool,
  name: PropTypes.string,
  title: PropTypes.string,
}

ContactCard.defaultProps = {
  imgUrl: null,
  name: '',
  title: '',
  isFavorite: false,
}

export default ContactCard
