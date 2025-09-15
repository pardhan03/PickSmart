import { configureStore } from '@reduxjs/toolkit'
import productReducer from './productSlice/productSlice'
import searchReducer from './searchSlice/searchSlice'

export const store = configureStore({
  reducer: {
    productSlice: productReducer,
    searchSlice: searchReducer,
  },
})