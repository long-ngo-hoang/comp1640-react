import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  documents: [],
  error: ''
}
const instance = axios.create({
    baseURL: 'https://localhost:7044'
  });

export const getDocuments = createAsyncThunk('categories/getDocuments', async () => {
  const response = await instance
    .get('/Documents');
    console.log(response.data)
  return response.data;
})

const categoriesSlice = createSlice({
  name: 'document',
  initialState,
  reducers:{
          addCategories: (state, action) => {
            state.documents = action.payload;
          }     
  },
  extraReducers: builder => {
    builder.addCase(getDocuments.fulfilled, (state, action) => {
      state.loading = false
      state.documents = action.payload
      state.error = ''
    })
  }
})

export default categoriesSlice.reducer