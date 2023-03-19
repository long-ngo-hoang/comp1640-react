import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from './api';

const initialState = {
  loading: false,
  departments: [],
  pageindex: 1,
  error: ''
}

export const getDepartments = createAsyncThunk('department/getDepartments', async () => {
  const response = await instance
    .get('/Departments');
  return response.data;
})

export const getDepartmentsById = createAsyncThunk('department/getDepartmentsById', async (id) => {
  const response = await instance
    .get(`/Departments/${id}?pageIndex=1`);
  return response.data;
})

export const addDepartmentsAsync = createAsyncThunk('department/addDepartmentsAsync', async (initialIdea) => {
  const response = await instance
    .post(`/Departments` , initialIdea);
  return response.data;
})

export const updateDepartmentsAsync = createAsyncThunk('department/updateDepartmentsAsync', async (initialIdea) => {
  const {id} = initialIdea;
  try{
  const response = await instance
    .put(`/Departments/${id}`, initialIdea);
  return response.data;
  }catch(err)
  {
    return initialIdea;
  }
})

export const deleteDepartmentsAsync = createAsyncThunk('department/deleteDepartmentsAsync', async (initialIdea) => {
  const  id  = initialIdea;
  const response = await instance
    .delete(`/Departments/${id}`);
    if (response?.status === 200) return initialIdea;   
  return response.data;
})

export const removeUserFromDepartment = createAsyncThunk('department/removeUserFromDepartment', async (initialIdea) => {
  const  id  = initialIdea;
  const response = await instance
    .put(`/Departments/RemoveUserFromDepartment/${id}`);
    if (response?.status === 200) return initialIdea;   
  return response.data;
})

const departmentsSlice = createSlice({
  name: 'departments',
  initialState,
  reducers:{
  },
  extraReducers: builder => {
    builder.addCase(getDepartments.pending, (state, action) => {
      state.status = 'loading'
      state.error = ''
    })
    builder.addCase(getDepartments.fulfilled, (state, action) => {
      state.status = 'Success'
      state.loading = false
      state.departments = action.payload
      state.error = ''
    })

    builder.addCase(getDepartmentsById.pending, (state, action) => {
      state.status = 'loading'
      state.loading = true
      state.error = ''
    })
    builder.addCase(getDepartmentsById.fulfilled, (state, action) => {
      state.status = 'Success'
      state.loading = false
      console.log("a",action.payload)
      state.departments = action.payload
      state.error = ''
    })

    builder.addCase(addDepartmentsAsync.fulfilled, (state, action) => {
      state.loading = false
      state.departments.push(action.payload)
      state.error = ''
    })

    builder.addCase(updateDepartmentsAsync.fulfilled, (state, action) => {
      // state.loading = false
      // state.categories.push(action.payload)
      // state.error = ''
     state.loading = false
      const  {id}  = action.payload;
      const department = state.departments.filter((item)=> item.id !== id);
      state.departments = [...department, action.payload];
      state.error = ''
    })

    builder.addCase(deleteDepartmentsAsync.fulfilled, (state, action) => {
      const id = action.payload;
      state.departments = state.departments.filter((item)=> item.id !== id)
    })

    builder.addCase(removeUserFromDepartment.fulfilled, (state, action) => {
      // const id = action.payload;
      // state.departments = state.departments.filter((item)=> item.id !== id)

    })
  }
})

export const selectAllDepartments = (state) => state.departments.departments;
export const selectUser = (state) => state.departments;
// export const selectDepartmentById = (state, Id) =>
//     state.departments.departments.find((item) => item.id === Id);

    export const selectCategoryById = (state, Id) =>
    state.departments.departments.find((category) => category.id === Id);


export default departmentsSlice.reducer