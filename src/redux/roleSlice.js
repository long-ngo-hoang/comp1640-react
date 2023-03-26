import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from './configApi';

const initialState = {
  loading: false,
  role: [],
  users: [],
  error: ''
}

export const getRole = createAsyncThunk('roleList/getRole', async (_, {rejectWithValue}) => {
  try{
  const response = await instance
    .get('/Roles');
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

export const getUserById = createAsyncThunk('roleList/getUserById', async (id, {rejectWithValue}) => {
  try{
  const response = await instance
    .get(`/UserRoles/${id}`);
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

export const getUser = createAsyncThunk('roleList/getUser', async (_, {rejectWithValue}) => {
  try{
  const response = await instance
    .get('/User');
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




export const getRoleById = createAsyncThunk('roleList/getRoleById', async (id, {rejectWithValue}) => {
  try{
    const response = await instance
      .get(`/UserRoles/${id}`);
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



  export const updateRoleAsync = createAsyncThunk('roleList/updateRoleAsync', async (initialData,{rejectWithValue}) => { 
    const {userId} = initialData
    const {roleId} = initialData
    try{
    const response = await instance
      .put(`/UserRoles/${userId}?roleId=${roleId}`);
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


const roleSlice = createSlice({
  name: 'roleList',
  initialState,
  reducers:{
  },
  extraReducers: builder => {
    builder.addCase(getRole.pending, (state, action) => {
        state.status = 'loading'
        state.loading = true
        
      })
    builder.addCase(getRole.fulfilled, (state, action) => {
      state.loading = false
      state.status = 'Success'
      state.role = action.payload
      state.error = ''
    })
    builder.addCase(getRole.rejected, (state, action) => {
      state.status = 'rejected'
      state.loading = false
      state.error = action.payload
      
    })
    builder.addCase(getUser.pending, (state, action) => {
      state.status = 'loading'
      state.loading = true
      
    })
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false
      state.status = 'Success'
      state.users = action.payload
      state.error = ''
    })
    builder.addCase(getUser.rejected, (state, action) => {
      state.status = 'rejected'
      state.loading = false
      state.error = action.payload      
    })
    builder.addCase(getUserById.pending, (state, action) => {
      state.status = 'loading'
      state.loading = true
      state.error = ''
    })
    builder.addCase(getUserById.fulfilled, (state, action) => {
      state.loading = false
      state.status = 'Success'
      state.users = action.payload
      state.error = ''
    })
    builder.addCase(getUserById.rejected, (state, action) => {
      state.status = 'rejected'
      state.loading = false
      state.error = action.payload
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
    builder.addCase(getRoleById.rejected, (state, action) => {
      state.status = 'rejected'
      state.loading = true
      state.error = action.payload
    })
  }
})

export const selectAllNotification = (state) => state.notification.notification;


export default roleSlice.reducer