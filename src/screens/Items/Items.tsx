import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { StackParamList, StackRouteProps } from '@/navigators/Main'
import { useAppDispatch, useAppSelector, useTheme } from '@/hooks'
import { Field, addItem, deleteItem, onItemValueChange } from '@/store/data'
import {
  Box,
  Button,
  Flex,
  Switch,
  TextInput,
} from '@react-native-material/core'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import moment from 'moment'
import { PlusIcon } from '@/Assets'
import { ItemsList } from '@/components'

const Items = () => {
  const route = useRoute<StackRouteProps<'Items'>>()
  const categoryIndex = route.params.categoryIndex

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={{ flexGrow: 1 }}
    >
      <ItemsList categoryIndex={categoryIndex} />
    </ScrollView>
  )
}

export default Items
