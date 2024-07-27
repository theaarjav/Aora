import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons, images } from '../constants'

const FormField = ({title, value, handleChange, otherStyles, placeHolder, keyboardType}) => {
    const [showPassword, setShowPassword] = useState(false)
  return (
    <View className={`${otherStyles} space-y-2 w-full`}>
      <Text className="text-white text-2xl font-pthin">{title}</Text>
      <View className="border-2 border-gray-100 w-full h-14 bg-black-100 rounded-2xl px-4 py-2 focus:border-secondary items-center flex-row">
        <TextInput 
        className="flex-1 text-white font-psemibold text-base"
        value={value}
        placeholder={placeHolder}
        placeholderTextColor={"#7b7b8b"}
        onChangeText={handleChange}
        secureTextEntry={title==="Password" && !showPassword}
        />
        {title==="Password" &&
            <TouchableOpacity onPress={()=>setShowPassword(!showPassword)}>
                <Image source={!showPassword?icons.eye:icons.eyeHide} className="w-6 h-6" resizeMode="contain"/>
            </TouchableOpacity>
        }
      </View>
    </View>
  )
}

export default FormField