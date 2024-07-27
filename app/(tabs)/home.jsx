import { View, Text, SafeAreaView, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useGlobalContext } from '../../context/GlobalContext'
import { images } from '../../constants'
import SearchArea from '../../components/SearchArea'
import EmptyState from '../../components/EmptyState'
import Trending from '../../components/Trending'
import { getAllPosts, getLatestPosts } from '../../lib/appwrite'
import { useAppwrite } from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
const Home = () => {
  const { user } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);
  
  const {data:posts, refetch}=useAppwrite(getAllPosts);
  const {data:latestPosts}=useAppwrite(getLatestPosts);
  const onRefresh = () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => { return item.$id }}
        renderItem={({ item }) => {
          return <VideoCard video={item}/>
        }}
        ListHeaderComponent={() => {
          return <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back 5
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {user.username}
                </Text>
              </View>
              <View>
                <Image
                  source={images.logoSmall}
                  className='w-9 h-10'
                />
              </View>
            </View>
            <View>
              <SearchArea otherStyles={""} itemType={"Videos"} />
            </View>
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-pregular text-gray-100 mb-3">
                Latest Videos
              </Text>

            </View>
              <Trending posts={latestPosts} />
          </View>
        }}
        ListEmptyComponent={() => {
          return <EmptyState
            title="No Videos Found"
            subtitle="No videos created yet"
          />
         
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  )
}

export default Home