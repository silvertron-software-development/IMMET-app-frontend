import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  cotizaciones: [],
  error: null,
  isLoading: true,
}

export const postNewPricing = createAsyncThunk(
  'prices/postPricing',
  async (prices, thunkAPI) => {
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/v1/prices',
        prices
      )
      return data
    } catch (error) {
      thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

const pricesSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {
    addPricing: (state, { payload }) => {
      const newPricing = payload
      state.cotizaciones = [...state.cotizaciones, newPricing]
    },
  },
  extraReducers: {
    [postNewPricing.pending]: (state) => {
      state.isLoading = true
    },
    [postNewPricing.fulfilled]: (state, { payload }) => {
      state.isLoading = false
    },
    [postNewPricing.rejected]: (state, { payload }) => {
      state.isLoading = false
      state.error = payload
    },
  },
})

export const { addPricing } = pricesSlice.actions

export default pricesSlice.reducer
