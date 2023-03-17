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

export const getProfiles = createAsyncThunk('users/getProfiles', async () => {
  const response = await instance
    .get('/Profiles');
  return response.data;
})

export const getProfilesById = createAsyncThunk('users/getProfilesById', async (initialIdea) => {
    const {id} = initialIdea;
    const response = await instance
      .get(`/Profiles/GetProfileByUserId/${id}`);
    return response.data;
  })


export const updateProfilesById = createAsyncThunk('users/updateProfilesById', async (initialIdea) => {
  const {id} = initialIdea;
  try{
  const response = await instance
    .put(`/Profiles/UpdateProfileByUserId/${id}`, initialIdea);
  return response.data;
  }catch(err)
  {
    return initialIdea;
  }
})

export const changePasswordAsync = createAsyncThunk('users/changePasswordAsync', async(initialIdea) => {
  try{
    const response = await instance
      .post(`/api/Auth/ChangePassword`, initialIdea);
    return response.data;
    }catch(err)
    {
      return initialIdea;
    }
})


const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers:{
  },
  extraReducers: builder => {
    builder.addCase(getProfiles.fulfilled, (state, action) => {
      state.loading = false
      state.users = action.payload
      state.error = ''
    })
    builder.addCase(getProfilesById.fulfilled, (state, action) => {
      state.loading = false
     
      state.users.push(action.payload)
      state.error = ''
    })
    builder.addCase(updateProfilesById.fulfilled, (state, action) => {
      // state.loading = false
      // state.categories.push(action.payload)
      // state.error = ''
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