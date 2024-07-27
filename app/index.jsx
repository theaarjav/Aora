import 'react-native-reanimated';
import { Text, StyleSheet, View, StatusBar, ScrollView, Image } from 'react-native';
import { SplashScreen, Link, Redirect, router } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { images } from '../constants';
import GlobalStyles from './GlobalStyles';
import CustomButton from '../components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '../context/GlobalContext';
// import { ScrollView } from 'react-native-gesture-handler';

export default function App() {
  const {loading, isLoggedIn} =useGlobalContext();
  if(!loading && isLoggedIn){
    return <Redirect href={'/home'}/>
  }
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }


  return (
    <SafeAreaView className="bg-primary h-full">
      <StatusBar translucent backgroundColor={"transparent"}/>
      <ScrollView >

        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image source={images.logo} className="w-[130px] h-[84px]" resizeMode="contain" />
          <Image source={images.cards} className="max-w-[380px] w-full h-[300px]" resizeMode="contain" />
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless possibilities with <Text className="text-secondary-200">Aura!</Text>
            </Text>
            <Image source={images.path} className="w-[136px] h-[15px] absolute -bottom-0 -right-8" resizeMode="contain" />
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-3 text-center">
            Use this app and experience its endless features and be happy, be safe
          </Text>
          <CustomButton title={"Start Exploring"} handlePress={()=>{
            router.push('/sign-in')
          }} buttonStyles={"w-full mt-7"} textStyles={""} isLoading={false}/>
        </View>
      </ScrollView>

      {/* <Link href={'/home'}>Home</Link> */}

    </SafeAreaView>
  );
}