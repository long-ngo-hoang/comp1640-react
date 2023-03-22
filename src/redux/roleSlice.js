import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from './configApi';

const initialState = {
  loading: false,
  role: [],
  users: [],
  error: ''
}

export const getRole = createAsyncThunk('roleList/getRole', async () => {
  const response = await instance
    .get('/Roles');
  return response.data;
})

export const getUserByID = createAsyncThunk('roleList/getUserByID', async (id) => {
  const response = await instance
    .get(`/UserRoles/${id}`);
  return response.data;
})

export const getUser = createAsyncThunk('roleList/getUser', async () => {
  const response = await instance
    .get('/User');
  return response.data;
})




export const getRoleById = createAsyncThunk('roleList/getRoleById', async (id) => {
    const response = await instance
      .get(`/UserRoles/${id}`);
    return response.data;
  })



  export const updateRoleAsync = createAsyncThunk('role/updateRoleAsync', async (initialData) => {
    const {userId} = initialData
    const {roleId} = initialData
    try{
    const response = await instance
      .put(`/UserRoles/${userId}?roleId=${roleId}`);
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
      console.log("A", action.payload)
      state.role = action.payload
      state.error = ''
    })
    builder.addCase(getUser.pending, (state, action) => {
      state.status = 'loading'
      state.loading = true
      state.error = ''
    })
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false
      state.status = 'Success'
      state.users = action.payload
      state.error = ''
    })
    builder.addCase(getUserByID.pending, (state, action) => {
      state.status = 'loading'
      state.loading = true
      state.error = ''
    })
    builder.addCase(getUserByID.fulfilled, (state, action) => {
      state.loading = false
      state.status = 'Success'
      state.users = action.payload
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