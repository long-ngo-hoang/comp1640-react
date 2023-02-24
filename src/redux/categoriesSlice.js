import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  categories: [],
  error: ''
}
const instance = axios.create({
    baseURL: 'https://localhost:7044'
  });

export const getCategories = createAsyncThunk('categories/getCategories', async () => {
  const response = await instance
    .get('/Categories');
    console.log(response.data)
  return response.data;
})

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers:{
          addCategories: (state, action) => {
            state.categories = action.payload;
          }     
  },
  extraReducers: builder => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.loading = false
      state.categories = action.payload
      state.error = ''
    })
  }

})

export default categoriesSlice.reducer