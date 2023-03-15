import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from './api';

const initialState = {
  loading: false,
  documents: [],
  error: ''
}

export const getDocuments = createAsyncThunk('categories/getDocuments', async () => {
  const response = await instance
    .get('/Documents');
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