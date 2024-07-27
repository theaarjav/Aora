import { Image, StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGlobalContext } from '../../context/GlobalContext'
import { icons, images } from '../../constants'
import { useAppwrite } from '../../lib/useAppwrite'
import EmptyState from '../../components/EmptyState'
import VideoCard from '../../components/VideoCard'
import { getUserPosts } from '../../lib/appwrite'
const Profile = () => {
  const { user, setUser, isLoggedIn, setIsLoggedIn,  } = useGlobalContext();
  const { data: userPosts } = useAppwrite(() => getUserPosts(user.$id));
  // console.log(userPosts);
  return (
    <SafeAreaView className="bg-primary h-full w-full">

          <FlatList
            data={userPosts}
            keyExtractor={(item) => { return item.$id }}
            renderItem={({ item }) => {
              return <VideoCard video={item} />
            }}
            ListHeaderComponent={() => {
              return <View className="flex mt-10 px-4 w-full space-y-6">
                <View className="flex-col w-full justify-center items-center">
                  <Image
                    source={{ uri: user.avatar }}
                    className="h-[200px] w-[200px] rounded-[100px]"
                  />
                  <View className="flex-row mt-10">
                    <View className="items-center gap-1 mr-10">
                      <Image
                        source={icons.profile}
                        className="w-6 h-6"
                        tintColor={"#CDCDCD"}
                        resizeMode="contain"
                      />
                      <Text className="text-primary text-2xl font-semibold text-white">{user.username}</Text>
                    </View>
                    <View className="items-center gap-3">
                      <Image
                        source={images.thumbnail}
                        className="w-6 h-6"
                        tintColor={"#CDCDCD"}
                        resizeMode="contain"
                      />
                      <Text className="text-primary text-lg font-pregular text-white">{user.email}</Text>
                    </View>
                  </View>
                </View>
                <View className="border-white border-top-2">

                <Text className="font-pmedium text-primary text-xl font-pbold text-gray-100 ">
                  Your posts
                </Text>
                </View>
              </View>
            }}
            ListEmptyComponent={() => {
              return <EmptyState
                title="No Videos Created By you"
                subtitle="Create your first video"
              />

            }}
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
          />
    </SafeAreaView>
  )
}

export default Profile