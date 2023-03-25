import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from './configApi';

const initialState = {
  loading: false,
  notification: [],
  error: ''
}

export const getNotifications = createAsyncThunk('notificationList/getNotifications', async (_, {rejectWithValue}) => {
  try{
  const response = await instance
    .get('/Notifications');
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

export const getNotificationsByID = createAsyncThunk('notificationList/getNotificationsByID', async (_, {rejectWithValue}) => {
  try{
    const response = await instance
      .get('/Notifications');
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



const notificationsSlice = createSlice({
  name: 'notificationList',
  initialState,
  reducers:{
  },
  extraReducers: builder => {
    builder.addCase(getNotifications.pending, (state, action) => {
        state.status = 'loading'
        state.loading = true
      })
    builder.addCase(getNotifications.fulfilled, (state, action) => {
      state.loading = false
      state.status = 'Success'
      state.notification = action.payload
      state.error = ''
    })
    builder.addCase(getNotifications.rejected, (state, action) => {
      state.status = 'rejected'
      state.loading = false
      state.error = action.payload
    })
    builder.addCase(getNotificationsByID.pending, (state, action) => {
        state.status = 'loading'
        state.loading = true
      })
    builder.addCase(getNotificationsByID.fulfilled, (state, action) => {
      state.loading = false
      state.status = 'Success'
      state.notification.push(action.payload)
      state.error = ''
    })
    builder.addCase(getNotificationsByID.rejected, (state, action) => {
      state.status = 'rejected'
      state.loading = false
      state.error = action.payload
    })
  }
})

export const selectAllNotification = (state) => state.notification.notification;


export default notificationsSlice.reducer