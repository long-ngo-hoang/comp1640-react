import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from './configApi';

const initialState = {
  loading: false,
  role: [],
  error: ''
}

export const getRole = createAsyncThunk('roleList/getRole', async () => {
  const response = await instance
    .get('/Roles');
  return response.data;
})

export const getRoleById = createAsyncThunk('roleList/getRoleById', async (id) => {
    const response = await instance
      .get(`/Roles/${id}`);
    return response.data;
  })
  export const updateRole = createAsyncThunk('roleList/updateRole', async (initialData) => {
    const id = initialData;
    try{
    const response = await instance
      .put(`/Roles/${id}`, initialData);
    return response.data;
    }catch(err)
    {
      return initialData;
    }
  })


const roleSlice = createSlice({
  name: 'roleList',
  initialState,
  reducers:{
  },
  extraReducers: builder => {
    builder.addCase(getRole.pending, (state, action) => {
        state.status = 'loading'
        state.loading = true
        state.error = ''
      })
    builder.addCase(getRole.fulfilled, (state, action) => {
      state.loading = false
      state.status = 'Success'
      state.role = action.payload
      state.error = ''
    })
    builder.addCase(getRoleById.pending, (state, action) => {
        state.status = 'loading'
        state.loading = false
        state.error = ''
      })
    builder.addCase(getRoleById.fulfilled, (state, action) => {
      state.loading = false
      state.status = 'Success'
      state.role = action.payload
      state.error = ''
    })
  }
})

export const selectAllNotification = (state) => state.notification.notification;


export default roleSlice.reducer