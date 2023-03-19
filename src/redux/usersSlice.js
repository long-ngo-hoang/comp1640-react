// import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from './api'

const initialState = {
  loading: false,
  users: [],
  error: ''
}
// const instance = axios.create({
//     baseURL: 'https://localhost:7044'
//   });

// const token = localStorage.getItem('token');

// const config = {
//      headers: { Authorization: `Bearer ${token}` }
//  };

export const getProfiles = createAsyncThunk('userList/getProfiles', async () => {
  const response = await instance
    .get('/Profiles');
  return response.data;
})

export const getProfileById = createAsyncThunk('userList/getProfilesById', async (initialData) => {
    const {id} = initialData;
    const response = await instance
      .get(`/Profiles/GetProfileByUserId/${id}`);
    return response.data;
  })


export const updateProfile = createAsyncThunk('userList/updateProfilesById', async (initialData) => {
  const {id} = initialData;
  try{
  const response = await instance
    .put(`/Profiles/UpdateProfileByUserId/${id}`, initialData);
  return response.data;
  }catch(err)
  {
    return initialData;
  }
})

export const changePassword = createAsyncThunk('userList/changePasswordAsync', async(initialData) => {
  try{
    const response = await instance
      .post(`/api/Auth/ChangePassword`, initialData);
    return response.data;
    }catch(err)
    {
      return initialData;
    }
})


const userSlice = createSlice({
  name: 'userList',
  initialState,
  reducers:{
  },
  extraReducers: builder => {
    builder.addCase(getProfiles.fulfilled, (state, action) => {
      state.loading = false
      state.users = action.payload
      state.error = ''
    })
    builder.addCase(getProfileById.fulfilled, (state, action) => {
      state.loading = false
     
      state.users.push(action.payload)
      state.error = ''
    })
    builder.addCase(updateProfile.fulfilled, (state, action) => {
     state.loading = false
      const  {id}  = action.payload;
      const user = state.categories.filter((category)=> category.id !== id);
      state.users = [...user, action.payload];
      state.error = ''
    })
  }
})


export const selectAllUsers = (state) => state.user.users;

export const selectCategoryById = (state, Id) =>
    state.categories.categories.find((category) => category.id === Id);

export default userSlice.reducer