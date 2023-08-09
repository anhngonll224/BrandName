import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  totalProductInCart: 0,
  listProductInCart: [],
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setListProductInCart: (state, action) => {
      state.listProductInCart = action.payload
    },
    setTotalProductInCart: (state, action) => {
      state.totalProductInCart = action.payload
    },
  },
})

export const { setListProductInCart, setTotalProductInCart } = cartSlice.actions

export default cartSlice.reducer
