import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

const CustomButton = ({title, handlePress, buttonStyles, textStyles, isLoading}) => {
  return (
    <TouchableOpacity className={`bg-secondary rounded-xl min-h-[68px] items-center justify-center p-3 ${buttonStyles} ${isLoading?'opacity-50':''}`}
        onPress={handlePress}
        disabled={isLoading}
    >
      <Text className={`text-primary font-pblack text-lg ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton