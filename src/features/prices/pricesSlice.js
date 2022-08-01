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
      const { data } = await axios.post(
        'http://localhost:5000/api/v1/prices',
        cotizaciones,
        { responseType: 'blob' }
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
      const deletedPricing = payload
      state.cotizaciiones = state.cotizaciones.filter(
        (cot) => cot.id !== deletedPricing.id
      )
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