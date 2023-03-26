import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from './configApi';

const initialState = {
  loading: false,
  reactions: [],
  error: ''
}

export const addReaction = createAsyncThunk('reactionList/addReaction', async (initialReaction, {rejectWithValue}) => {
  try{
  const response = await instance
    .post('/Reactions', initialReaction);
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

export const deleteReaction = createAsyncThunk('reactionList/deleteReaction', async (initialReaction, {rejectWithValue}) => {
  try{
    const response = await instance
      .delete(`/Reactions/${initialReaction}`);
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
    builder.addCase(addReaction.rejected, (state, action) => {
      state.status = 'rejected'
      state.loading = false
      state.error = action.payload
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
    builder.addCase(deleteReaction.rejected, (state, action) => {
      state.status = 'rejected'
      state.loading = false
      state.error = ''
    })
  }
})

export const selectAllNotification = (state) => state.notification.notification;


export default reactionsSlice.reducer