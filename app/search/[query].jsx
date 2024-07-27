import { View, Text, SafeAreaView, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useGlobalContext } from '../../context/GlobalContext'
import { images } from '../../constants'
import SearchArea from '../../components/SearchArea'
import EmptyState from '../../components/EmptyState'
import { getAllPosts, getLatestPosts, getSearchedPosts } from '../../lib/appwrite'
import { useAppwrite } from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { useLocalSearchParams } from 'expo-router'
// import TabsWindow from '../_layout'
const SearchQuery = () => {
  const { query } = useLocalSearchParams()
  const { user } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);

  const {data:searchedPosts, refetch} = useAppwrite(()=>getSearchedPosts(query));
  const onRefresh = async () => {
    setRefreshing(true);
    // refetch()
    setRefreshing(false);
  };
  useEffect(() => {
    refetch()
  }, [query])
  
  return (
    // <SafeAreaView className="bg-primary h-full">
    //   <FlatList
    //     data={searchedPosts}
    //     keyExtractor={(item) => { return item.$id }}
    //     renderItem={({ item }) => {
    //       return <VideoCard video={item} />
    //     }}
    //     ListHeaderComponent={() => {
    //       return <View className="flex my-6 px-4 space-y-6">
    //         <View className="flex justify-between items-start flex-row mb-6">
    //           <View>
    //             <Text className="font-pmedium text-sm text-gray-100">
    //               Search results for 
    //             </Text>
    //             <Text className="text-2xl font-psemibold text-white">
    //               {query}
    //             </Text>
    //           </View>
    //           <View>
    //             <Image
    //               source={images.logoSmall}
    //               className='w-9 h-10'
    //             />
    //           </View>
    //         </View>
    //         <View>
    //           <SearchArea initialQuery={query} otherStyles={""} itemType={"Videos"} />
    //         </View>
    //       </View>
    //     }}
    //     ListEmptyComponent={() => {
    //       return <EmptyState
    //         title={`No Videos for ${query}`} 
    //         subtitle={`Be the first to create about ${query}`} 
    //       />

    //     }}
    //     refreshControl={
    //       <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    //     }
    //   />
    // </SafeAreaView>
    <Text className="text-white">
      Hello World
    </Text>

  )
}

export default SearchQuery