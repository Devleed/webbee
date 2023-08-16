import { createSlice } from '@reduxjs/toolkit'

const initialState: NavigationState = {
  drawerOpen: false,
}

const slice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    toggleDrawer: state => {
      state.drawerOpen = !state.drawerOpen
    },
    openDrawer: state => {
      state.drawerOpen = true
    },
    closeDrawer: state => {
      state.drawerOpen = false
    },
  },
})

export const { toggleDrawer, openDrawer, closeDrawer } = slice.actions

export default slice.reducer

export type NavigationState = {
  drawerOpen: boolean
}
