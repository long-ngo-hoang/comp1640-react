import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const instance = axios.create({
    baseURL: 'https://localhost:7044',
    // headers: { Authorization: `Bearer ${token}` }
  });
 
  export const login = createAsyncThunk('accountList/login', async (initialIdea ,{rejectWithValue}) => {   
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

  export const refreshToken = createAsyncThunk('accountList/refreshToken', async (initialToken,{rejectWithValue}) => {   
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

  export const forgotPassword = createAsyncThunk('accountList/forgotPassword', async (email,{rejectWithValue}) => {   
    
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

  const accountsSlice = createSlice({
    name: 'accountList',
    initialState : {
      loading: false,
      token: null,
      error: '',
      status: 'idle'
    },
    reducers:{
      logout:(state, action)=>{
        state.token = null
        localStorage.removeItem('token')
        localStorage.removeItem('rftoken')
        localStorage.removeItem('persist:root')

      }
    },
    extraReducers: builder => {
      builder
      .addCase(login.pending, (state, action) => {
        state.loading = true
        state.error = 'null'
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload
        state.status = 'success';
        localStorage.setItem('token', state.token.token)
        localStorage.setItem('rftoken', state.token.refreshToken)
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = 'null'
      })

      .addCase(refreshToken.pending, (state, action) => {
        state.loading = true
        state.error = 'null'
        state.status = 'loading';
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload
        localStorage.setItem('token', state.token.token)
        localStorage.setItem('rftoken', state.token.refreshToken)
        state.error = ''
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = false
        state.error = 'null'
      })

      .addCase(forgotPassword.pending, (state, action) => {
        state.loading = true
        state.error = 'null'
        state.status = 'loading';
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = true
        state.error = 'Success'
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false
        state.error = 'null'
      })
    }
  })
  
export const {logout}  = accountsSlice.actions

export const selectToken = (state) => state.accountList.token.token;

export default accountsSlice.reducer