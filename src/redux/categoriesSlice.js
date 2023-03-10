// import store from './store';
import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { useDispatch } from 'react-redux';
import { refreshToken } from './loginSlice';
import jwt_decode from "jwt-decode";

// import store from './store';


// import { createStore } from 'redux'


// const store = createStore(todos, ['Use Redux'])
const initialState = {
  loading: false,
  categories: [],
  error: ''
}
const instance = axios.create({
    baseURL: 'https://localhost:7044'
  });

  let store

export const injectStore = _store => {
  store = _store
}

const token = localStorage.getItem('token');

const config = {
     headers: { Authorization: `Bearer ${token}` }
 };


 instance.interceptors.request.use(
  async (config) => {         
    // const dispatch = useDispatch();
    // const store1 ={store};
    let currentDate = new Date();
      const decodedToken = jwt_decode(token);    
      const exp = decodedToken.exp;
    
      const expired = (Date.now() >= exp * 1000)
      console.log(expired)
      if (decodedToken.exp !== currentDate.getTime()) {
        console.log("a")
        
        // store.dispatch();
        await store.dispatch(refreshToken());
      }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getCategories = createAsyncThunk('categories/getCategories', async () => {
  const response = await instance
    .get('/Categories', config);
    console.log(response.data)
  return response.data;
})

export const addCategoryAsync = createAsyncThunk('categories/addCategoryAsync', async (initialIdea) => {
  console.log(initialIdea)
  const response = await instance
    .post(`/Categories` , initialIdea,config);
  return response.data;
})

export const updateCategoryAsync = createAsyncThunk('categories/updateCategoryAsync', async (initialIdea) => {
  const {id} = initialIdea;
  try{
  const response = await instance
    .put(`/Categories/${id}`, initialIdea);
    console.log("update" , response)
  return response.data;
  }catch(err)
  {
    return initialIdea;
  }
})

export const deleteCategoryAsync = createAsyncThunk('categories/deleteCategoryAsync', async (initialIdea) => {
  const  id  = initialIdea;
  const response = await instance
    .delete(`/Categories/${id}`);
    if (response?.status === 200) return initialIdea;   
  return response.data;
})

const categoriesSlice = createSlice({
  name: 'categorie',
  initialState,
  reducers:{
  },
  extraReducers: builder => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.loading = false
      state.categories = action.payload
      state.error = ''
    })
    builder.addCase(addCategoryAsync.fulfilled, (state, action) => {
      state.loading = false
      console.log(action.payload)
      state.categories.push(action.payload)
      state.error = ''
    })
    builder.addCase(updateCategoryAsync.fulfilled, (state, action) => {
      // state.loading = false
      // console.log(action.payload)
      // state.categories.push(action.payload)
      // state.error = ''
     state.loading = false
      const  {id}  = action.payload;
      const category = state.categories.filter((category)=> category.id !== id);
      state.categories = [...category, action.payload];
      state.error = ''
    })
    builder.addCase(deleteCategoryAsync.fulfilled, (state, action) => {
      const id = action.payload;
      state.categories = state.categories.filter((item)=> item.id !== id)
    })
  }
})


export const selectAllCategories = (state) => state.categories.categories;

export const selectCategoryById = (state, Id) =>
    state.categories.categories.find((category) => category.id === Id);



export default categoriesSlice.reducer