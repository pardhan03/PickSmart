import { createSlice } from '@reduxjs/toolkit'
import { PRODUCT_DATA } from '../../../utils/constant'

const initialState = {
  items: PRODUCT_DATA,
}

export const mainSlice = createSlice({
  name: 'mainSlice',
  initialState,
  reducers: {
  },
})


export default mainSlice.reducer