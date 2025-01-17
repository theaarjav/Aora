import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { icons } from '../constants'
import { Video, ResizeMode } from 'expo-av'

const VideoCard = ({ video: { title, thumbnail, prompt,media,  maestro: { username, avatar } } }) => {
    const [play, setPlay] = useState(false)
    return (
        <View className="flex-col items-center mt-3 p-3">
            <View className="flex flex-row gap-3 items-start">
                <View className="flex justify-center items-center flex-row flex-1">
                    <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
                        <Image
                            source={{ uri: avatar }}
                            className="w-full h-full rounded-lg"
                            resizeMode="contain"
                        />
                    </View>
                    <View className="flex justify-center flex-1 ml-3 gap-y-1">
                        <Text
                            className="font-psemibold text-sm text-white"
                            numberOfLines={1}
                        >
                            {title}
                        </Text>
                        <Text
                            className="text-xs text-gray-100 font-pregular"
                            numberOfLines={1}
                        >
                            {username}
                        </Text>
                    </View>
                    <View className="pt-2">
                        <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
                    </View>
                </View>

            </View>
            {play ?
                <Video
                source={{ uri: media }}
                className="w-full h-60 rounded-xl mt-3"
                resizeMode={ResizeMode.CONTAIN}
                useNativeControls
                shouldPlay
                onPlaybackStatusUpdate={(status) => {
                  if (status.didJustFinish) {
                    setPlay(false);
                  }
                }}
              />
                : <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}
                    className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
                >
                    <Image
                        source={{ uri: thumbnail }}
                        className="w-full h-full rounded-xl mt-3"
                        resizeMode="cover"
                    />

                    <Image
                        source={icons.play}
                        className="w-12 h-12 absolute"
                        resizeMode="contain"
                    />
                </TouchableOpacity>}
        </View>
    )
}

export default VideoCard