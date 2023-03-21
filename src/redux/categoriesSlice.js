import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from './configApi';

export const getCategories = createAsyncThunk('categoryList/getCategories', async () => {
  const response = await instance
    .get('/Categories');
  return response.data;
    })

export const getCategoryById = createAsyncThunk('categoryList/getCategoryById', async (initialData) => {
  const id = initialData;
  const response = await instance
    .get(`/Categories/${id}`);
  return response.data;
    })
    
export const addCategory = createAsyncThunk('categoryList/addCategory', async (initialData) => {
  const response = await instance
    .post(`/Categories`, initialData);
  return response.data;
})

export const updateCategory = createAsyncThunk('categoryList/updateCategory', async (initialData) => {
  const {id} = initialData;
  const response = await instance
    .put(`/Categories/${id}`, initialData);
  return response.data;
})

export const deleteCategory = createAsyncThunk('categoryList/deleteCategoryAsync', async (initialData) => {
  const  id  = initialData;
  const response = await instance
    .delete(`/Categories/${id}`);
  return response.data;
})

const categoriesSlice = createSlice({
  name: 'categoryList', 
  initialState:{
    loading: false,
    status: "idle",
    categories: []
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
    })
    .addCase(getCategories.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected"
    })

    .addCase(getCategoryById.pending, (state, action) => {
      state.loading = true;
      state.status = "loading";
    })
    .addCase(getCategoryById.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "idle"
      state.categories[0] = action.payload
    })
    .addCase(getCategoryById.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected"
    })

    .addCase(addCategory.pending, (state, action) => {
      state.loading = true;
      state.status = "loading";
    })
    .addCase(addCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "idle";
      state.categories.push(action.payload)
    })
    .addCase(addCategory.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected"
    })

    .addCase(updateCategory.pending, (state, action) => {
      state.loading = true;
      state.status = "loading";
    })
    .addCase(updateCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "idle";
      let currentCategory = state.categories.filter((category)=> category.id !== action.payload.id);
      currentCategory = action.payload;
    })
    .addCase(updateCategory.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected"
    })

    .addCase(deleteCategory.pending, (state, action) => {
      state.loading = true;
      state.status = "loading";
    })
    .addCase(deleteCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "idle";
      state.categories = state.categories.filter((item)=> item.id !== action.payload.id)
    })
    .addCase(deleteCategory.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected"
    })
  }
})

export const selectAllCategories = (state) => state.categories.categories;

export const selectCategoryById = (state, Id) =>
    state.categories.categories.find((category) => category.id === Id);
    
export default categoriesSlice.reducer