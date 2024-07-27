import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser, getCurrUser, signIn } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalContext'

const SignIn = () => {
  const {setUser, setIsLoggedIn} = useGlobalContext()
  const [form, setForm] = useState({
    email:'',
    password:''
  })
  const [isLoading, setIsLoading] = useState(false)
  const handleSignIn=async()=>{
    // console.log("In here")
    if(!form.email || !form.password){
      Alert.alert('Error', 'All the details are necessary')
      // setIsLoading(true);
      
    }
    setIsLoading(true)
    // console.log(form)
    try {
      // console.log("Befor signing in")
      await signIn(form);
      const user=getCurrUser();
      
      // console.log("User not set yet");
      setUser(user)
      setIsLoggedIn(true);
      console.log(user);
      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', error.message)
      console.log(error);
      throw Error(error);
    }finally{
      setIsLoading(false)
    }
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="justify-center items-center w-full px-4 my-6 min-h-[85vh]">
          <Image source={images.logo} className="w-[115px] h-[35px]" resizeMode="contain"/>
          <Text className="text-2xl mt-7 text-white font-psemibold">Log in To Aora</Text>
          <FormField 
          title={'Email'}
          value={form.email}
          handleChange={(e)=>{setForm({...form, email:e})}}  
          otherStyles={"mt-12"}
          placeHolder={"Email Address"}
          keyboardType={'email-address'}
        />
          <FormField 
          title={'Password'}
          value={form.password}
          handleChange={(e)=>{setForm({...form, password:e})}}  
          otherStyles={"mt-7"}
          placeHolder={"Password"}
          keyboardType={'password'}
        />
        <CustomButton 
        title={"Sign In"}
        handlePress={handleSignIn}
        buttonStyles={"w-full mt-7"}
        isLoading={isLoading}
        />
        <View className="justify-center gap-2 mt-5 flex-row items-center">
          <Text className="text-[#FFF] font-pregular">Don't have an account?</Text>
          <Link href={'/sign-up'} className='text-secondary font-pbold text-gl'>Sign Up</Link>
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn