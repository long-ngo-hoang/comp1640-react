import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from './configApi'

export const getProfiles = createAsyncThunk('userList/getProfiles', async (_, {rejectWithValue}) => {
  try{
  const response = await instance
    .get('/Profiles');
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

export const getProfileById = createAsyncThunk('userList/getProfilesById', async (initialData, {rejectWithValue}) => {
  try{
    const id = initialData;
    const response = await instance
      .get(`/Profiles/${id}`);
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

export const updateProfile = createAsyncThunk('userList/updateProfilesById', async (initialData, {rejectWithValue}) => {
  const {id} = initialData;
  try{
  const response = await instance
    .put(`/Profiles/${id}`, initialData);
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

const profileSlice = createSlice({
  name: 'userList',
  initialState: {
    loading: false,
    users: [],
    error: ''
  },
  reducers:{
  },
  extraReducers: builder => {
    builder
    .addCase(getProfiles.pending, (state, action) => {
      state.status = 'loading';
      state.loading = true;
    })
    .addCase(getProfiles.fulfilled, (state, action) => {
      state.loading = false
      state.users = action.payload
      state.error = ''
    })
    .addCase(getProfiles.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected"
      state.error = action.payload
    })

    .addCase(getProfileById.pending, (state, action) => {
      state.status = 'loading';
      state.loading = true;
    })
    .addCase(getProfileById.fulfilled, (state, action) => {
      state.loading = false
      state.users = action.payload
      state.error = ''
    })
    .addCase(getProfileById.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected"
      state.error = action.payload
    })

    .addCase(updateProfile.pending, (state, action) => {
      state.status = 'loading';
      state.loading = true;
    })
    .addCase(updateProfile.fulfilled, (state, action) => {
     state.loading = false
      state.error = ''
    })
    .addCase(updateProfile.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected"
      state.error = action.payload
    })
  }
})

export const selectAllUsers = (state) => state.user.users;

export const selectUserById = (state, Id) =>
    state.user.users.find((item) => item.id === Id);

export default profileSlice.reducer