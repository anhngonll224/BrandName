import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  listSystemKey: [],
  listCount: {},
  listTabs: [],
  isAuthenticated: false,
  userInfo: {},
}

export const appGlobalSlice = createSlice({
  name: "appGlobal",
  initialState,
  reducers: {
    getListSystemKey: (state, action) => {
      state.listSystemKey = action.payload
    },
    setListTabs: (state, action) => {
      state.listTabs = action.payload
    },
    changeAuthorization: (state, action) => {
      state.isAuthenticated = action.payload
    },
    setListCount: (state, action) => {
      state.listCount = action.payload
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
  },
})

export const {
  getListSystemKey,
  changeAuthorization,
  setListTabs,
  setListCount,
  setUserInfo,
} = appGlobalSlice.actions

export default appGlobalSlice.reducer
