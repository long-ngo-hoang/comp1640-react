import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from './configApi';

export const getDocuments = createAsyncThunk('documentList/getDocuments', async () => {
  const response = await instance
    .get('/Documents');
  return response.data;
})

const documentsSlice = createSlice({
  name: 'documentList',
  initialState: {
    loading: false,
    documents: [],
    error: ''},
  reducers:{
          addCategories: (state, action) => {
            state.documents = action.payload;
          }     
  },
  extraReducers: builder => {
    builder
    .addCase(getDocuments.pending, (state, action) => {
      state.loading = true;
      state.status = "loading";
    })
    .addCase(getDocuments.fulfilled, (state, action) => {
      state.loading = false
      state.documents = action.payload
      state.error = ''
    })
    .addCase(getDocuments.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected"
    })
  }
})

export default documentsSlice.reducer