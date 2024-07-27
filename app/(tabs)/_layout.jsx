import { View, Text, Image } from 'react-native'
import { Tabs, Redirect } from 'expo-router'
import React from 'react'
import { icons } from '../../constants'
import {FontAwesome} from '@expo/vector-icons'
import { useGlobalContext } from '../../context/GlobalContext'
// FontAwesome
const TabIcon = ({ icon, color, name, focused }) => {
  
  return (
    <View className="flex items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsWindow = () => {
  const { loading, isLoggedIn } = useGlobalContext();

  if (!loading && !isLoggedIn) return <Redirect href="/sign-in" />;
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focussed }) => {
              return <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focussed={focussed}
              />
              // <FontAwesome size={28} name="home" color={color}/>
            }
          }}
        />
        <Tabs.Screen
          name="bookmark"
          options={{
            title: 'Bookmark',
            headerShown: false,
            tabBarIcon: ({ color, focussed }) => {
              return <TabIcon
                icon={icons.bookmark}
                color={color}
                name="Bookmark"
                focussed={focussed}
              />
            }
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: 'Create',
            headerShown: false,
            tabBarIcon: ({ color, focussed }) => {
              return <TabIcon
                icon={icons.plus}
                color={color}
                name="Create"
                focussed={focussed}
              />
            }
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, focussed }) => {
              return <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focussed={focussed}
              />
            }
          }}
        />
      </Tabs>
    </>
  )
}

export default TabsWindow