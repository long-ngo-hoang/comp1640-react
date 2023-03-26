import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { PURGE } from "redux-persist";

const token = localStorage.getItem('token');


const instance = axios.create({
    baseURL: 'https://localhost:7044',
    headers: { Authorization: `Bearer ${token}` }

  });
 
  const initialState = {
    loading: false,
    token: null,
    error: '',
    status: 'idle'
  }

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
            return rejectWithValue(error.response.data)
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
            return rejectWithValue(error.response.data)
        }
    }    
  })

  export const forgotPassword = createAsyncThunk('accountList/forgotPassword', async (email,{rejectWithValue}) => {   
    
    try{     
    const response = await instance
      .post(`/api/Auth/ForgotPassword?email=${encodeURIComponent(email)}`);
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

  export const changePassword = createAsyncThunk('accountList/changePasswordAsync', async(initialData, {rejectWithValue}) => {
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

export const registerUser = createAsyncThunk('accountList/registerUser', async(initialData, {rejectWithValue}) => {
  try{
    const response = await instance
      .post(`/api/Auth/Register`, initialData);
    return response.data;
  }
    catch(error){
      if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
      } else {
          return rejectWithValue(error.response.data)
      }
  }
})

  const accountsSlice = createSlice({
    name: 'accountList',
    initialState,
    reducers:{
      logout:(state, action)=>{
        localStorage.removeItem('token')
        localStorage.removeItem('rftoken')
   
      }
    },
    extraReducers: builder => {
      builder
      .addCase(PURGE, () => initialState)
      .addCase(login.pending, (state, action) => {
        state.loading = true
        state.error = ''
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload
        state.status = 'success';
        localStorage.setItem('token', state.token.token)
        localStorage.setItem('rftoken', state.token.refreshToken)
        state.error = ''
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(refreshToken.pending, (state, action) => {
        state.loading = true
        state.error = ''
        state.status = 'loading';
      })
      builder.addCase(refreshToken.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload
        localStorage.setItem('token', state.token.token)
        localStorage.setItem('rftoken', state.token.refreshToken)
        state.error = ''
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(forgotPassword.pending, (state, action) => {
        state.loading = true
        state.error = ''
        state.status = 'loading';
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = true
        state.status = 'succes'
        state.error = ''
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(changePassword.pending, (state, action) => {
        state.loading = true
        state.error = ''
        state.status = 'loading';
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false
        state.status = 'succes'
        state.error = action.payload
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

          //register
    .addCase(registerUser.pending, (state, action) => {
      state.status = 'loading';
      state.loading = true;
    })
    .addCase(registerUser.fulfilled, (state, action) => {
     state.loading = false
      state.status = 'Success'
      state.error = ''

    })
    .addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected"
      state.error = action.payload
    })
    }
  })
  
export const {logout}  = accountsSlice.actions

export const selectToken = (state) => state.accountList.token.token;

export default accountsSlice.reducer