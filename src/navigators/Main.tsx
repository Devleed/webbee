import React from 'react'
import { Dashboard, Items, ManageCategories } from '../screens'
import { createStackNavigator } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { Text, TouchableOpacity } from 'react-native'
import { Drawer } from '@/components'
import { useAppDispatch } from '@/hooks'
import { openDrawer } from '@/store/navigation'
import { HamburgerIcon } from '@/Assets'

const Stack = createStackNavigator()

export type StackParamList = {
  ManageCategories: undefined
  Items: {
    categoryIndex: number
  }
  Dashboard: undefined
}

export type StackRouteProps<RouteName extends keyof StackParamList> = RouteProp<
  StackParamList,
  RouteName
>

// @refresh reset
const MainNavigator = () => {
  const dispatch = useAppDispatch()

  return (
    <>
      <Drawer />
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerLeft: ({ onPress }) => (
            <TouchableOpacity
              onPress={() => dispatch(openDrawer())}
              style={{ marginLeft: 20 }}
            >
              <HamburgerIcon height={20} width={20} style={{ color: '#000' }} />
            </TouchableOpacity>
          ),
        }}
      >
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen
          name="ManageCategories"
          options={{
            headerTitle: 'Manage categories',
          }}
          component={ManageCategories}
        />
        <Stack.Screen name="Items" component={Items} />
      </Stack.Navigator>
    </>
  )
}

export default MainNavigator
