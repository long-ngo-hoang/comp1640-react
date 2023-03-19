import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from './api';

const initialState = {
  loading: false,
  notification: [],
  error: ''
}

export const getNotifications = createAsyncThunk('notification/getNotifications', async () => {
  const response = await instance
    .get('/Notifications');
  return response.data;
})

export const getNotificationsByID = createAsyncThunk('notification/getNotificationsByID', async () => {
    const response = await instance
      .get('/Notifications');
    return response.data;
  })



const notificationsSlice = createSlice({
  name: 'notification',
  initialState,
  reducers:{
  },
  extraReducers: builder => {
    builder.addCase(getNotifications.pending, (state, action) => {
        state.status = 'loading'
        state.loading = true
        state.error = ''
      })
    builder.addCase(getNotifications.fulfilled, (state, action) => {
      state.loading = false
      state.status = 'Success'
      state.notification = action.payload
      state.error = ''
    })
    builder.addCase(getNotificationsByID.pending, (state, action) => {
        state.status = 'loading'
        state.loading = false
        state.error = ''
      })
    builder.addCase(getNotificationsByID.fulfilled, (state, action) => {
      state.loading = false
      state.status = 'Success'
      state.notification.push(action.payload)
      state.error = ''
    })
  }
})

export const selectAllNotification = (state) => state.notification.notification;


export default notificationsSlice.reducer