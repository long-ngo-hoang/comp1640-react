import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    token: null,
    error: ''
}

const token = localStorage.getItem('token');
const instance = axios.create({
    baseURL: 'https://localhost:7044',
    // headers: { Authorization: `Bearer ${token}` }
  });
 
  export const loginAsync = createAsyncThunk('login/loginAsync', async (initialIdea ,{rejectWithValue}) => {   
    try{
    const response = await instance
      .post(`/api/Auth/Login` , initialIdea);
    return response.data;
    }
    catch(error){
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
  })

  export const refreshToken = createAsyncThunk('login/refreshToken', async (initialToken,{rejectWithValue}) => {   
    try{     
    const response = await instance
      .post(`/api/Auth/RefreshToken?refreshToken=${encodeURIComponent(initialToken)}`);
      
      return response.data;
    }
      catch(error){     
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }    
  })

  export const forgotPasswordAsync = createAsyncThunk('login/forgotPasswordAsync', async (email,{rejectWithValue}) => {   
    
    try{     
    const response = await instance
      .post(`/api/Auth/ForgotPassword?email=${email}`);
      return response;
    }
      catch(error){     
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }    
  })

  const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers:{
      logout:(state,action)=>{
        state.token = null
        localStorage.removeItem('token')
        localStorage.removeItem('rftoken')
      }
    },
    extraReducers: builder => {
      // builder.addCase(getCategories.fulfilled, (state, action) => {
      //   state.loading = false
      //   state.categories = action.payload
      //   state.error = ''
      // })
    //   builder.addCase(loginAsync.pending, (state, action) => {
    //     state.loading = true
    //     state.error = 'null'
    //   })
      builder.addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload
        localStorage.setItem('token', state.token.token)
        localStorage.setItem('rftoken', state.token.refreshToken)
        state.error = ''
      })
      builder.addCase(refreshToken.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload
        localStorage.setItem('token', state.token.token)
        localStorage.setItem('rftoken', state.token.refreshToken)
        state.error = ''
      })
      builder.addCase(forgotPasswordAsync.fulfilled, (state, action) => {
        state.loading = true
        state.error = 'Success'
      })
    //   builder.addCase(loginAsync.rejected, (state, action) => {
    //     state.loading = false
    //     state.error = 'null'
    //   })

    }
  })
  
export const {logout}  = loginSlice.actions

export const selectToken = (state) => state.login.token.token;

export default loginSlice.reducer