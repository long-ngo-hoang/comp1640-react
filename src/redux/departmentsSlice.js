import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from './api';

export const getDepartments = createAsyncThunk('departmentList/getDepartments', async () => {
  const response = await instance
    .get('/Departments');
  return response.data;
})

export const getDepartmentById = createAsyncThunk('departmentList/getDepartmentById', async (initialData) => {
  const id = initialData;
  const response = await instance
    .get(`/Departments/${id}?pageIndex=1`);
  return response.data;
})

export const addDepartment = createAsyncThunk('departmentList/addDepartment', async (initialData) => {
  const response = await instance
    .post(`/Departments` , initialData);
  return response.data;
})

export const updateDepartment = createAsyncThunk('departmentList/updateDepartment', async (initialData) => {
  const {id} = initialData;
  const response = await instance
    .put(`/Departments/${id}`, initialData);
  return response.data;
})

export const deleteDepartment = createAsyncThunk('departmentList/deleteDepartment', async (initialData) => {
  const  id  = initialData;
  const response = await instance
    .delete(`/Departments/${id}`);
  return response.data;
})

export const removeUserFromDepartment = createAsyncThunk('departmentList/removeUserFromDepartment', async (initialData) => {
  const  id  = initialData; 
   console.log(id);

  const response = await instance
    .put(`/Departments/RemoveUserFromDepartment/${id}`);
  return response.data;
})

const departmentsSlice = createSlice({
  name: 'departmentList',
  initialState:{
    loading: false,
    status: "idle",
    departments: []
  },
  reducers:{
  },
  extraReducers: builder => {
    builder
    .addCase(getDepartments.pending, (state, action) => {
      state.loading = true;
      state.status = "loading";
    })
    .addCase(getDepartments.fulfilled, (state, action) => {
      state.loading = false
      state.departments = action.payload
      state.error = ''
    })

    builder.addCase(getDepartmentById.pending, (state, action) => {
      state.status = 'loading'
      state.loading = true
      state.error = ''
    })
    builder.addCase(getDepartmentById.fulfilled, (state, action) => {
      state.status = 'Success'
      state.loading = false
      state.departments[0] = action.payload
    })
    .addCase(getDepartmentById.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected"
    })

    .addCase(addDepartment.pending, (state, action) => {
      state.loading = true;
      state.status = "loading";
    })
    .addCase(addDepartment.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "idle";
      state.departments.push(action.payload)
    })
    .addCase(addDepartment.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected"
    })

    .addCase(updateDepartment.pending, (state, action) => {
      state.loading = true;
      state.status = "loading";
    })
    .addCase(updateDepartment.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "idle";
      const currentDepartment = state.departments.filter((item)=> item.id !==  action.payload.id);
      currentDepartment = action.payload;
    })
    .addCase(updateDepartment.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected"
    })

    .addCase(deleteDepartment.pending, (state, action) => {
      state.loading = true;
      state.status = "loading";
    })
    .addCase(deleteDepartment.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "idle";
      state.departments = state.departments.filter((item)=> item.id !== action.payload.id)
    })
    .addCase(deleteDepartment.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected"
    })

    builder.addCase(removeUserFromDepartment.fulfilled, (state, action) => {
      const id = action.payload;
      state.departments = state.departments.filter((item)=> item.id !== id)

    })

    builder.addCase(removeUserFromDepartment.rejected, (state, action) => {
      // const id = action.payload;
      // state.departments = state.departments.filter((item)=> item.id !== id)

    })
  }
})

export const selectAllDepartments = (state) => state.departments.departments;
export const selectUser = (state) => state.departments;


export const selectDepartmentById = (state) =>
  state.departments.departments[0]


export default departmentsSlice.reducer