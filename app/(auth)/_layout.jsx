import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const AuthWindow = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name='sign-in' options={
          {
            headerShown:false
          }
        }/>
        <Stack.Screen name='sign-up' options={
          {
            headerShown:false
          }
        }/>
        {/* <StatusBar backgroundColor='#0000FF' style='light'/> */}
      </Stack>
    </>
  )
}

export default AuthWindow