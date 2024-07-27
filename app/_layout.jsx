import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Slot, Stack } from 'expo-router'
import GlobalContext from '../context/GlobalContext'

const RootLayout = () => {
  return (
    <GlobalContext>

      <Stack>
        <Stack.Screen name='index' options={
          {
            headerShown: false
          }
        } />
        <Stack.Screen name='(auth)' options={
          {
            headerShown: false
          }
        } />
        <Stack.Screen name='(tabs)' options={
          {
            headerShown: false
          }
        } />
        <Stack.Screen name='search/[query]' options={
          {
            headerShown: false
          }
        } />
      </Stack>
    </GlobalContext>
  )
}

export default RootLayout

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }

})