import { configureStore } from '@reduxjs/toolkit'
import pricesReducer from '../features/prices/pricesSlice'

export const store = configureStore({
  reducer: {
    prices: pricesReducer,
  },
})
