import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalContext'



const SignUp = () => {
  const {setUser, setIsLoggedIn}=useGlobalContext()
  const [form, setForm] = useState({
    email:'',
    password:'',
    username:''
  })
  const [isLoading, setIsLoading] = useState(false)
  const handleSignUp=async()=>{
    if(!form.email || form.email=='' || !form.username || form.username=='' || !form.password || form.password==''){
      Alert.alert('Error', 'All the details are necessary')
    }
    setIsLoading(true);
    try {
      const result=await createUser(form);
      setUser(result)
      setIsLoggedIn(false);
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
        <View className="justify-center items-center w-full px-4 my-6 min-h-[87vh]">
          <Image source={images.logo} className="w-[115px] h-[35px]" resizeMode="contain"/>
          <Text className="text-2xl mt-7 text-white font-psemibold">Create an Account!</Text>
          <FormField 
          title={'Username'}
          value={form.username}
          handleChange={(e)=>{setForm({...form, username:e})}}  
          otherStyles={"mt-12"}
          placeHolder={"Username"}
        />
          <FormField 
          title={'Email'}
          value={form.email}
          handleChange={(e)=>{setForm({...form, email:e})}}  
          otherStyles={"mt-7"}
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
        title={"Sign Up"}
        handlePress={handleSignUp}
        buttonStyles={"w-full mt-7"}
        isLoading={isLoading}
        />
        <View className="justify-center gap-2 mt-5 flex-row items-center">
          <Text className="text-[#FFF] font-pregular">Already have an account?</Text>
          <Link href={'/sign-in'} className='text-secondary font-pbold text-gl'>Sign In</Link>
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp