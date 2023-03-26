import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { act } from 'react-dom/test-utils';
import instance from './configApi';

export const getCategories = createAsyncThunk('categoryList/getCategories', async (_, {rejectWithValue}) => {
  try{
  const response = await instance
    .get('/Categories');
  return response.data;
  }
  catch(error){
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

export const getCategoryById = createAsyncThunk('categoryList/getCategoryById', async (initialData, {rejectWithValue}) => {
  try{
  const id = initialData;
  const response = await instance
    .get(`/Categories/${id}`);
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
    
export const addCategory = createAsyncThunk('categoryList/addCategory', async (initialData, {rejectWithValue}) => {
  try{
  const response = await instance
    .post(`/Categories`, initialData);
  return response.data;
  }
  catch(error){
    if (error.response && error.response.status == 401) {
      console.log("a", error)
        return rejectWithValue("End of Login Session")
    }if (error.response && error.response.status == 403){
      console.log("a", error)
      return rejectWithValue("Your accounts don't can't access")
    } else {
      console.log("b", error)
        return rejectWithValue(error.response.data)
    }
}
})

export const updateCategory = createAsyncThunk('categoryList/updateCategory', async (initialData,{rejectWithValue}) => {
  try{
  const {id} = initialData;
  const response = await instance
    .put(`/Categories/${id}`, initialData);
  return response.data;
  }catch(error){
    if (error.response && error.response.status == 401) {
      console.log("a", error)
        return rejectWithValue("End of Login Session")
    }if (error.response && error.response.status == 403){
      console.log("a", error)
      return rejectWithValue("Your accounts don't can't access")
    } else {
      console.log("b", error)
        return rejectWithValue(error.response.data)
    }
  }
})

export const deleteCategory = createAsyncThunk('categoryList/deleteCategoryAsync', async (initialData, {rejectWithValue}) => {
  try{
  const  id  = initialData;
  const response = await instance
    .delete(`/Categories/${id}`);
  return response.data;
  }
  catch(error){
    if (error.response && error.response.status == 401) {
      console.log("a", error)
        return rejectWithValue("End of Login Session")
    }if (error.response && error.response.status == 403){
      console.log("a", error)
      return rejectWithValue("Your accounts don't can't access")
    } else {
      console.log("b", error)
        return rejectWithValue(error.response.data)
    }
  }
})

const categoriesSlice = createSlice({
  name: 'categoryList', 
  initialState:{
    loading: false,
    status: "idle",
    categories: [],
    error: ''

  },
  reducers:{
  },
  extraReducers: builder => {
    builder
    .addCase(getCategories.pending, (state, action) => {
      state.loading = true;
      state.status = "loading";
    })
    .addCase(getCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "idle"
      state.categories = action.payload
      state.error = ''
    })
    .addCase(getCategories.rejected, (state, action) => {
      state.loading = false;
      console.log(action.payload)
      state.error = action.payload
    })

    .addCase(getCategoryById.pending, (state, action) => {
      state.loading = true;
      state.status = "loading";
    })
    .addCase(getCategoryById.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "idle"
      state.categories[0] = action.payload
      state.error= ''
    })
    .addCase(getCategoryById.rejected, (state, action) => {
      state.loading = false;
      state.status = action.payload
    })
    
    //addCategory
    .addCase(addCategory.pending, (state, action) => {
      state.loading = true;
      state.status = "loading";
    })
    .addCase(addCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "idle";
      state.categories.push(action.payload)
      state.error = ''
    })
    .addCase(addCategory.rejected, (state, action) => {
      state.loading = false;
      console.log(action.payload)
      state.error = action.payload
    })

    .addCase(updateCategory.pending, (state, action) => {
      state.loading = true;
      state.status = "loading";
    })
    .addCase(updateCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "Success";
      let currentCategory = state.categories.filter((category)=> category.id !== action.payload.id);
      currentCategory = action.payload;
      state.error=''
    })
    .addCase(updateCategory.rejected, (state, action) => {
      state.loading = false;
      state.status = action.payload
    })

    .addCase(deleteCategory.pending, (state, action) => {
      state.loading = true;
      state.status = "loading";
    })
    .addCase(deleteCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "idle";
      state.categories = state.categories.filter((item)=> item.id !== action.meta.arg)
    })
    .addCase(deleteCategory.rejected, (state, action) => {
      state.loading = false;
      state.error= action.payload

      state.status = action.payload
    })
  }
})

export const selectAllCategories = (state) => state.categories.categories;

export const selectCategoryById = (state, Id) =>
    state.categories.categories.find((category) => category.id === Id);
    
export default categoriesSlice.reducer