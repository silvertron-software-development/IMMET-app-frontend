import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

const initialState = {
  cotizaciones: [],
  error: null,
  isLoading: true,
}

export const postNewPricing = createAsyncThunk(
  'prices/postPricing',
  async (_, thunkAPI) => {
    const cotizaciones = thunkAPI.getState().prices.cotizaciones
    console.log(cotizaciones)
    try {
      console.log(cotizaciones)
      const { data } = await axios.post(
        process.env.REACT_APP_BACKEND,
        cotizaciones,
        {
          responseType: 'blob',
        }
      )
      const file = new Blob([data], {
        type: 'application/pdf',
      })
      console.log(file)
      const fileURL = URL.createObjectURL(file)

      window.open(fileURL)
      return fileURL
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
      const values = payload
      const id = uuidv4()
      state.cotizaciones = [...state.cotizaciones, { ...values, id }]
    },
    removePricing: (state, { payload }) => {
      console.log(payload)
      const deletedPricing = payload
      console.log(deletedPricing)
      state.cotizaciones = state.cotizaciones.filter(
        (cot) => cot.id !== deletedPricing
      )
    },
  },
  extraReducers: {
    [postNewPricing.pending]: (state) => {
      state.isLoading = true
    },
    [postNewPricing.fulfilled]: (state, { payload }) => {
      state.cotizaciiones = []
      state.isLoading = false
    },
    [postNewPricing.rejected]: (state, { payload }) => {
      state.isLoading = false
      state.error = payload
    },
  },
})

export const { addPricing, removePricing } = pricesSlice.actions

export default pricesSlice.reducer
