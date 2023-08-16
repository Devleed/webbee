import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type FieldType = 'string' | 'number' | 'checkbox' | 'date'

export interface Field {
  type: FieldType
  value: string | number | boolean
  name: string
  error?: string
}

export interface Category {
  name: string
  titleField: number
  fields: Field[]
}

export interface TaskState {
  categories: Category[]
  items: { itemValues: any[] }[][]
}

const initialState: TaskState = {
  categories: [],
  items: [],
}

export const taskSlice = createSlice({
  name: 'bot',
  initialState,
  reducers: {
    addCategory: state => {
      const newCategory: Category = {
        name: 'New Category',
        titleField: 0,
        fields: [
          {
            type: 'string',
            value: '',
            name: 'Field',
          },
        ],
      }

      state.categories = [...state.categories, newCategory]
    },
    changeCategoryName: (
      state,
      { payload }: PayloadAction<{ index: number; value: string }>,
    ) => {
      const categories = [...state.categories]
      const category = categories[payload.index] as Category

      category.name = payload.value
      state.categories = categories
    },
    addField: (
      state,
      { payload }: PayloadAction<{ index: number; fieldType: FieldType }>,
    ) => {
      const categories = [...state.categories]
      const category = categories[payload.index] as Category

      category.fields = [
        ...category.fields,
        { name: '', type: payload.fieldType, value: '' },
      ]
      state.categories = categories
    },
    deleteField: (
      state,
      { payload }: PayloadAction<{ index: number; fieldIndex: number }>,
    ) => {
      const categories = [...state.categories]
      const category = categories[payload.index] as Category

      const items = [...state.items]
      items[payload.index]?.forEach(item => {
        item.itemValues.splice(payload.fieldIndex, 1)
      })

      state.items = items

      category.fields.splice(payload.fieldIndex, 1)
      state.categories = categories
    },
    updateFieldName: (
      state,
      {
        payload,
      }: PayloadAction<{
        categoryIndex: number
        fieldIndex: number
        fieldName: string
      }>,
    ) => {
      const categories = [...state.categories]
      const category = categories[payload.categoryIndex] as Category

      const duplicateName = category.fields.find(
        field => field.name === payload.fieldName,
      )

      const field = category.fields[payload.fieldIndex]
      field.name = payload.fieldName

      if (duplicateName) {
        field.error = 'Duplicate field name'
      } else {
        field.error = undefined
      }

      state.categories = categories
    },
    updateFieldType: (
      state,
      {
        payload,
      }: PayloadAction<{
        categoryIndex: number
        fieldIndex: number
        fieldType: FieldType
      }>,
    ) => {
      const categories = [...state.categories]
      const category = categories[payload.categoryIndex] as Category

      const field = category.fields[payload.fieldIndex]
      field.type = payload.fieldType

      state.categories = categories
    },
    addItem: (state, { payload }: PayloadAction<{ index: number }>) => {
      const category = state.categories[payload.index] as Category

      const items = state.items
      items[payload.index] = [
        ...(state.items[payload.index] || []),
        { itemValues: category.fields.map(field => null) },
      ]

      state.items = items
    },
    deleteItem: (
      state,
      { payload }: PayloadAction<{ index: number; itemIndex: number }>,
    ) => {
      const items = [...state.items]
      items[payload.index].splice(payload.itemIndex, 1)

      state.items = items
    },
    onItemValueChange: (
      state,
      {
        payload,
      }: PayloadAction<{
        categoryIndex: number
        itemIndex: number
        valueIndex: number
        value: any
      }>,
    ) => {
      state.items[payload.categoryIndex][payload.itemIndex].itemValues[
        payload.valueIndex
      ] = payload.value
    },
    updateTitleIndex: (
      state,
      { payload }: PayloadAction<{ index: number; titleIndex: number }>,
    ) => {
      const categories = [...state.categories]
      const category = categories[payload.index] as Category

      category.titleField = payload.titleIndex
      state.categories = categories
    },
    deleteCategory: (state, { payload }: PayloadAction<{ index: number }>) => {
      const categories = [...state.categories]
      categories.splice(payload.index, 1)

      const items = [...state.items]
      items.splice(payload.index, 1)

      state.categories = categories
      state.items = items
    },
  },
})

export const {
  addCategory,
  changeCategoryName,
  updateFieldName,
  addField,
  addItem,
  onItemValueChange,
  updateTitleIndex,
  deleteCategory,
  deleteField,
  deleteItem,
  updateFieldType,
} = taskSlice.actions

export default taskSlice.reducer
