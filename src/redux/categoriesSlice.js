import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from './api';

const initialState = {
  loading: false,
  categories: [],
  error: ''
}

export const getCategories = createAsyncThunk('categories/getCategories', async () => {
  const response = await instance
    .get('/Categories');
    console.log(response.data)
  return response.data;
})

export const addCategoryAsync = createAsyncThunk('categories/addCategoryAsync', async (initialIdea) => {
  console.log(initialIdea)
  const response = await instance
    .post(`/Categories`, initialIdea);
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