import { actions } from '@/Store'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { useDispatch, useSelector } from 'react-redux'
import tailwind from 'tailwind-rn'
import StarIcon from '../Assets/svgs/star.svg'

const ConnectedFavoriteIcon = () => {
  const dispatch = useDispatch()
  const currentContact = useSelector(state => state.currentContact)

  return (
    <TouchableOpacity
      onPress={() =>
        dispatch({
          type: actions.TOGGLE_FAVORITE,
          id: currentContact.id,
        })
      }
    >
      <SvgXml
        xml={StarIcon}
        width={24}
        height={24}
        style={tailwind(
          `pr-4 mr-4 ${
            currentContact.isFavorite ? 'text-yellow-500' : 'text-gray-400'
          }`,
        )}
      />
    </TouchableOpacity>
  )
}

export default ConnectedFavoriteIcon
