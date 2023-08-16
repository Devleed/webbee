import React, { useMemo } from 'react'
import { View, Text, ScrollView, Dimensions } from 'react-native'
import {
  changeCategoryName,
  updateFieldName,
  updateTitleIndex,
  addField,
  addCategory,
  deleteCategory,
  deleteField,
  updateFieldType,
  FieldType,
} from '../../store/data' // Import your Redux actions
import { useAppDispatch, useAppSelector, useTheme } from '../../hooks'
import { Button, Flex, TextInput } from '@react-native-material/core'
import { Category, Dropdown } from '@/components'
import DeviceInfo from 'react-native-device-info'

const { width, height } = Dimensions.get('screen')

const ManageCategories = () => {
  const dispatch = useAppDispatch()
  const categories = useAppSelector(state => state.data.categories) // Assuming you have a "categories" slice in your Redux store
  const { Colors } = useTheme()

  const categoriesJSX = useMemo(() => {
    return categories.map((category, index) => (
      <Category key={index} category={category} index={index} />
    ))
  }, [categories])

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Flex
          direction={DeviceInfo.isTablet() ? 'row' : 'column'}
          wrap={DeviceInfo.isTablet()}
        >
          {categoriesJSX}
        </Flex>
      </ScrollView>
      <Button
        title="Add new category"
        onPress={() => dispatch(addCategory())}
        style={{
          position: 'absolute',
          bottom: 10,
          left: 10,
          width: width - 20,
          backgroundColor: Colors.primary,
        }}
      />
    </View>
  )
}

export default ManageCategories
