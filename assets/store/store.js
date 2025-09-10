import { configureStore } from '@reduxjs/toolkit'
import mainReducer from './mainSlice/mainSlice'
import productReducer from './productSlice/productSlice'

export const store = configureStore({
  reducer: {
    mainSlice: mainReducer,
    productSlice: productReducer
  },
})