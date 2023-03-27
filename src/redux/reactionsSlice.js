import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from './configApi';

const initialState = {
  loading: false,
  reactions: [],
  error: ''
}

export const updateReaction = createAsyncThunk('reactionList/updateReaction', async (initialReaction, {rejectWithValue}) => {
  try{
  const response = await instance
    .put('/Reactions', initialReaction);
  return response.data;
  }catch(error){
    if (error.response && error.response.status == 401) {
        return rejectWithValue("End of login sesion")
    } if (error.response && error.response.status == 403){
      console.log("a", error)
      return rejectWithValue("Your accounts don't can't access")
    }else {
        return rejectWithValue(error.response.data)
    }
  }
})

const reactionsSlice = createSlice({
  name: 'reactionList',
  initialState,
  reducers:{
  },
  extraReducers: builder => {
    builder.addCase(updateReaction.pending, (state, action) => {
        state.status = 'loading'
        state.loading = true
        state.error = ''
      })
    builder.addCase(updateReaction.fulfilled, (state, action) => {
      state.loading = false
      state.status = 'Success'
      state.reactions = action.payload
      state.error = ''
    })
    builder.addCase(updateReaction.rejected, (state, action) => {
      state.status = 'rejected'
      state.loading = false
      state.error = action.payload
    })
  }
})

export const selectAllNotification = (state) => state.notification.notification;


export default reactionsSlice.reducer