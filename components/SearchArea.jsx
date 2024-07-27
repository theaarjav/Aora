import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { icons, images } from '../constants'
import { router, usePathname } from 'expo-router'
const FormField = ({ initialQuery, otherStyles, itemType }) => {
    const pathName=usePathname();
    const [query, setQuery] = useState(initialQuery || '')
    const handleQueryChange=(e)=>{
        setQuery(e);
    }
    const handleSearchPress=(e)=>{
        console.log("HandleSearch Pressed")
        if(query==""){
            Alert.alert('','Please Search Something')
        }else{
            if(pathName.startsWith('/search')){
                console.log(query);
                router.setParams({query});
            }else{
                console.log(pathName)
                router.push(`/search/${query}`);
            }
        }
    }
    return (
        <View className={`${otherStyles} space-y-2 w-full`}>
            <View className="border-2 border-gray-100 w-full h-14 bg-black-100 rounded-2xl px-4 py-2 focus:border-secondary items-center flex-row">
                <TextInput
                    className="flex-1 text-white font-psemibold text-base"
                    placeholder={`Search '${itemType?itemType:''}'`}
                    value={query}
                    placeholderTextColor={"#7b7b8b"}
                    onChangeText={handleQueryChange}
                />
                <TouchableOpacity onPress={handleSearchPress}>
                    <Image source={icons.search} className="w-6 h-6" resizeMode="contain" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default FormField