import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useAppSelector, useNavigate, useTheme } from '@/hooks'
import { Button, Flex } from '@react-native-material/core'
import Items from '../Items/Items'
import { ItemsList } from '@/components'

const Dashboard = () => {
  const navigate = useNavigate()
  const { Colors } = useTheme()

  const categories = useAppSelector(state => state.data.categories)

  if (categories.length === 0)
    return (
      <Flex items="center" justify="center" style={{ flex: 1 }}>
        <Text>No categories found</Text>
        <Button
          title="Manage categories"
          style={{ margin: 10, backgroundColor: Colors.primary }}
          onPress={() => navigate('ManageCategories')}
        />
      </Flex>
    )

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flexGrow: 1 }}>
        {categories.map((_, index) => (
          <View key={index}>
            <ItemsList categoryIndex={index} />
          </View>
        ))}
      </ScrollView>

      <Button
        title="Manage categories"
        style={{ margin: 10, backgroundColor: Colors.primary }}
        onPress={() => navigate('ManageCategories')}
      />
    </View>
  )
}

export default Dashboard
