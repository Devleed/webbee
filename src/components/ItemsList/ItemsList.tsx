import { View, Text, TouchableOpacity } from 'react-native'
import React, { useCallback, useState } from 'react'
import {
  Box,
  Button,
  Flex,
  Switch,
  TextInput,
} from '@react-native-material/core'
import { useAppDispatch, useAppSelector, useTheme } from '@/hooks'
import { useRoute } from '@react-navigation/native'
import { StackRouteProps } from '@/navigators/Main'
import { addItem, deleteItem, onItemValueChange } from '@/store/data'
import { PlusIcon } from '@/Assets'
import moment from 'moment'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import DeviceInfo from 'react-native-device-info'

const ItemsList: React.FC<{ categoryIndex: number }> = ({ categoryIndex }) => {
  const [dateModalVisible, setDateModalVisible] = useState<string | null>(null)

  const { Colors, Fonts, Gutters } = useTheme()

  const dispatch = useAppDispatch()

  const items = useAppSelector(state => state.data.items[categoryIndex]) || []
  const category = useAppSelector(state => state.data.categories[categoryIndex])

  const renderFields = useCallback(
    (item: { itemValues: any[] }, itemIndex: number) => {
      return category.fields.map((field, index) => {
        if (field.type === 'checkbox') {
          return (
            <Flex
              direction="row"
              items="center"
              key={index}
              style={{ marginBottom: 10 }}
            >
              <Switch
                value={!!item.itemValues[index]}
                onValueChange={() => {
                  dispatch(
                    onItemValueChange({
                      categoryIndex,
                      itemIndex,
                      valueIndex: index,
                      value: !item.itemValues[index],
                    }),
                  )
                }}
              />
              <Text style={[Fonts.textSmall, { marginLeft: 10 }]}>
                {field.name}
              </Text>
            </Flex>
          )
        } else if (field.type === 'date') {
          return (
            <Flex key={index} style={{ marginBottom: 10 }}>
              <TouchableOpacity
                key={index}
                onPress={() => setDateModalVisible(`${itemIndex}-${index}`)}
              >
                <Text>{item.itemValues[index] || 'Select date'}</Text>
              </TouchableOpacity>
            </Flex>
          )
        } else if (field.type === 'number') {
          return (
            <TextInput
              key={index}
              variant="outlined"
              label={field.name}
              value={item.itemValues[index]}
              keyboardType="numeric"
              onChangeText={val =>
                dispatch(
                  onItemValueChange({
                    categoryIndex,
                    itemIndex,
                    valueIndex: index,
                    value: val,
                  }),
                )
              }
              style={{ marginBottom: 10 }}
            />
          )
        } else if (field.type === 'string') {
          return (
            <TextInput
              key={index}
              variant="outlined"
              label={field.name}
              value={item.itemValues[index]}
              onChangeText={val =>
                dispatch(
                  onItemValueChange({
                    categoryIndex,
                    itemIndex,
                    valueIndex: index,
                    value: val,
                  }),
                )
              }
              style={{ marginBottom: 10 }}
            />
          )
        }
      })
    },
    [],
  )

  return (
    <>
      <Flex direction="row" items="center" style={{ paddingHorizontal: 10 }}>
        <Text style={Fonts.titleSmall}>{category.name}</Text>

        <TouchableOpacity
          onPress={() => dispatch(addItem({ index: categoryIndex }))}
          style={{ marginLeft: 'auto' }}
        >
          <Flex direction="row" items="center">
            <PlusIcon
              height={15}
              width={15}
              style={{ color: Colors.primary }}
            />
            <Text
              style={[
                Fonts.textSmall,
                { marginLeft: 10, color: Colors.primary },
              ]}
            >
              Add item
            </Text>
          </Flex>
        </TouchableOpacity>
      </Flex>

      {items.length === 0 ? (
        <Text
          style={[
            Gutters.regularHMargin,
            Gutters.regularVMargin,
            Fonts.textRegular,
          ]}
        >
          No items
        </Text>
      ) : (
        <Flex
          direction={DeviceInfo.isTablet() ? 'row' : 'column'}
          wrap={DeviceInfo.isTablet()}
        >
          {items.map((item, index) => (
            <View
              style={{
                backgroundColor: 'white',
                padding: 10,
                width: DeviceInfo.isTablet() ? '48%' : '95%',
                margin: 10,
              }}
              key={index}
            >
              <Text
                style={[Fonts.textRegular, { height: 30, marginBottom: 10 }]}
              >
                {category.titleField || category.titleField === 0
                  ? item.itemValues[category.titleField]
                  : null}
              </Text>
              {renderFields(item, index)}
              <Button
                title="Delete"
                style={{ backgroundColor: Colors.primary }}
                onPress={() =>
                  dispatch(
                    deleteItem({ index: categoryIndex, itemIndex: index }),
                  )
                }
              />
            </View>
          ))}
        </Flex>
      )}

      <DateTimePickerModal
        isVisible={!!dateModalVisible}
        mode="date"
        onConfirm={val => {
          if (dateModalVisible) {
            const [itemIndex, valueIndex] = dateModalVisible.split('-')

            dispatch(
              onItemValueChange({
                categoryIndex,
                itemIndex: parseInt(itemIndex, 10),
                valueIndex: parseInt(valueIndex, 10),
                value: moment(val.getTime()).format('MMM Do YYYY'),
              }),
            )
          }
          setDateModalVisible(null)
        }}
        onCancel={() => setDateModalVisible(null)}
      />
    </>
  )
}

export default ItemsList
