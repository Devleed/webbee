import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import { Box, Button, Flex, TextInput } from '@react-native-material/core'
import { useAppDispatch, useAppSelector, useTheme } from '@/hooks'
import {
  Category as CategoryType,
  FieldType,
  addField,
  changeCategoryName,
  deleteCategory,
  deleteField,
  updateFieldName,
  updateFieldType,
  updateTitleIndex,
} from '@/store/data'
import Dropdown from '../Dropdown/Dropdown'
import { DustbinIcon } from '../../Assets'
import DeviceInfo from 'react-native-device-info'

const { width } = Dimensions.get('screen')

const Category: React.FC<{ category: CategoryType; index: number }> = ({
  category,
  index,
}) => {
  const dispatch = useAppDispatch()
  const { Gutters, Layout, Colors, Fonts } = useTheme()

  const categoriesLength = useAppSelector(state => state.data.categories).length

  return (
    <View
      key={index}
      style={{
        marginBottom:
          index === categoriesLength - 1 && !DeviceInfo.isTablet() ? 200 : 10,
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        width: DeviceInfo.isTablet() ? '48%' : '95%',
      }}
    >
      <Text style={[Fonts.titleSmall, { color: '#000', height: 50 }]}>
        {category.name}
      </Text>
      <TextInput
        value={category.name}
        onChangeText={value => dispatch(changeCategoryName({ index, value }))}
        variant="outlined"
      />
      {category.fields.map((field, fieldIndex) => (
        <View key={fieldIndex}>
          <Flex direction="row">
            <TextInput
              value={field.name}
              variant="outlined"
              onChangeText={fieldName =>
                dispatch(
                  updateFieldName({
                    categoryIndex: index,
                    fieldIndex,
                    fieldName,
                  }),
                )
              }
              style={[{ marginVertical: 5, flex: 1 }]}
            />

            <Dropdown
              data={[
                { label: 'Text', value: 'string' },
                { label: 'Number', value: 'number' },
                { label: 'Checkbox', value: 'checkbox' },
                { label: 'Date', value: 'date' },
              ]}
              selectedItems={[field.type]}
              onSelect={({ value }) =>
                dispatch(
                  updateFieldType({
                    categoryIndex: index,
                    fieldIndex,
                    fieldType: value as FieldType,
                  }),
                )
              }
              itemStyle={{ marginTop: 5, height: 54, backgroundColor: 'white' }}
              textStyle={{ color: 'black' }}
            />

            <TouchableOpacity
              onPress={() => dispatch(deleteField({ index, fieldIndex }))}
              style={[Layout.center, { padding: 10 }]}
            >
              <DustbinIcon
                height={20}
                width={20}
                style={{ color: Colors.primary }}
              />
            </TouchableOpacity>
          </Flex>

          {field.error ? (
            <Text style={{ color: 'red' }}>{field.error}</Text>
          ) : null}
        </View>
      ))}

      <Dropdown
        permanentLabel="TITLE FIELD: "
        selectedItems={[String(category.titleField)]}
        data={category.fields.map((field, index) => ({
          label: field.name,
          value: String(index),
        }))}
        onSelect={item => {
          dispatch(updateTitleIndex({ index, titleIndex: Number(item.value) }))
        }}
        itemStyle={{
          width: '100%',
        }}
        textStyle={{
          color: 'white',
        }}
      />

      <Flex direction="row" items="center" style={{ marginTop: 10 }}>
        <Dropdown
          permanentLabel="ADD NEW FIELD"
          selectedItems={[]}
          data={[
            { label: 'Text', value: 'string' },
            { label: 'Number', value: 'number' },
            { label: 'Checkbox', value: 'checkbox' },
            { label: 'Date', value: 'date' },
          ]}
          onSelect={item => {
            dispatch(addField({ index, fieldType: item.value as FieldType }))
          }}
          itemStyle={{
            width: 200,
          }}
          textStyle={{
            color: 'white',
          }}
        />

        <TouchableOpacity
          onPress={() => dispatch(deleteCategory({ index }))}
          style={[Gutters.regularLMargin]}
        >
          <Flex direction="row" items="center">
            <DustbinIcon
              height={20}
              width={20}
              style={{ color: Colors.primary }}
            />
            <Text
              style={[
                Fonts.textSmall,
                { color: Colors.textGray400, marginLeft: 10 },
              ]}
            >
              REMOVE
            </Text>
          </Flex>
        </TouchableOpacity>
      </Flex>
    </View>
  )
}

export default Category
