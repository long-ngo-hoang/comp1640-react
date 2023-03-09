import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Cookies } from 'react-cookie';

const initialState = {
    loading: false,
    token: null,
    error: ''
}
const instance = axios.create({
    baseURL: 'https://localhost:7044'
  });
  const cookies = new Cookies();
  const token = localStorage.getItem('token');
  const cookie = cookies.get(`rf`);
  console.log("ga", cookie)
  const config = {
    headers: { Authorization: `QsRS9QpgNBIxUTIxd5qi6PuHoPCNQMdWLcnyBXQG9Vmp5LvQk1cNnRQYOU7fcxi99xGM3%2B%2FH5aRTXGEzMMueVA%3D%3D` }
};
  
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

  export const refreshToken = createAsyncThunk('login/refreshToken', async (_,{rejectWithValue}) => {   
    console.log("ngu   ", config)
    try{     
    const response = await instance
      .post(`/api/Auth/Refresh-Token`, config);
      return response.data;
    }
      catch(error){     
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
          console.log("b")
            return rejectWithValue(error.message)
        }
    }    
  })

//   export default function parseJwt(token) {
//     var dateNow = new Date();

//     if (!token) { return; }
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace('-', '+').replace('_', '/');
//     const tokenAfterParse =  JSON.parse(window.atob(base64));
//     if(tokenAfterParse.exp > dateNow.getTime()){
//     return true;
//     }
//     else{
        
//         return false;
//     }
// }


  const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers:{
 
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
        // console.log(action.payload)
        state.token = action.payload
        localStorage.setItem('token', state.token)
        state.error = ''
      })
      builder.addCase(refreshToken.fulfilled, (state, action) => {
        state.loading = false
        // console.log(action.payload)
        state.token = action.payload
        localStorage.setItem('token', state.token)
        state.error = ''
      })
    //   builder.addCase(loginAsync.rejected, (state, action) => {
    //     state.loading = false
    //     state.error = 'null'
    //   })

    }
  })
  
export default loginSlice.reducer