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
    const {id} = initialData;
    const response = await instance
      .get(`/Profiles/GetProfileByUserId/${id}`);
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

export const changePassword = createAsyncThunk('userList/changePasswordAsync', async(initialData, {rejectWithValue}) => {
  try{
    const response = await instance
      .post(`/api/Auth/ChangePassword`, initialData);
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

export const registerUser = createAsyncThunk('userList/registerUser', async(initialData, {rejectWithValue}) => {
  try{
    const response = await instance
      .post(`/api/Auth/Register`, initialData);
    return response.data;
  }
    catch(error){
      if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
      } else {
        console.log("a", error)
          return rejectWithValue(error.response.data)
      }
  }
})



const userSlice = createSlice({
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
     
      state.users.push(action.payload)
      state.error = ''
    })
    .addCase(getProfileById.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected"
      state.status = action.payload
    })

    .addCase(updateProfile.pending, (state, action) => {
      state.status = 'loading';
      state.loading = true;
    })
    .addCase(updateProfile.fulfilled, (state, action) => {
     state.loading = false
      const  {id}  = action.payload;
      const user = state.categories.filter((category)=> category.id !== id);
      state.users = [...user, action.payload];
      state.error = ''
    })
    .addCase(updateProfile.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected"
      state.error = action.payload
    })

    //register
    .addCase(registerUser.pending, (state, action) => {
      state.status = 'loading';
      state.loading = true;
    })
    .addCase(registerUser.fulfilled, (state, action) => {
     state.loading = false
      state.error = 'Success'
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected"
      state.error = action.payload
    })
  }
})

export const selectAllUsers = (state) => state.user.users;

export const selectCategoryById = (state, Id) =>
    state.categories.categories.find((category) => category.id === Id);

export default userSlice.reducer