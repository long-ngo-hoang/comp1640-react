import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from './configApi';

const initialState = {
  loading: false,
  reactions: [],
  error: ''
}

export const addReaction = createAsyncThunk('reactionList/addReaction', async (initialReaction) => {
  const response = await instance
    .get('/Reactions', initialReaction);
  return response.data;
})

export const deleteReaction = createAsyncThunk('reactionList/deleteReaction', async (initialReaction) => {
    const response = await instance
      .get('/Reactions', initialReaction);
    return response.data;
  })



const reactionsSlice = createSlice({
  name: 'reactionList',
  initialState,
  reducers:{
  },
  extraReducers: builder => {
    builder.addCase(addReaction.pending, (state, action) => {
        state.status = 'loading'
        state.loading = true
        state.error = ''
      })
    builder.addCase(addReaction.fulfilled, (state, action) => {
      state.loading = false
      state.status = 'Success'
      state.reactions = action.payload
      state.error = ''
    })
    builder.addCase(deleteReaction.pending, (state, action) => {
        state.status = 'loading'
        state.loading = false
        state.error = ''
      })
    builder.addCase(deleteReaction.fulfilled, (state, action) => {
      state.loading = false
      state.status = 'Success'
      state.reactions = action.payload
      state.error = ''
    })
  }
})

export const selectAllNotification = (state) => state.notification.notification;


export default reactionsSlice.reducer