import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { act } from 'react-dom/test-utils';
import instance from './configApi';

export const getDepartments = createAsyncThunk('departmentList/getDepartments', async (_, {rejectWithValue}) => {
  try{
  const response = await instance
    .get('/Departments');
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

export const getDepartmentById = createAsyncThunk('departmentList/getDepartmentById', async (initialData, {rejectWithValue}) => {
  try{
  const id = initialData;
  const response = await instance
    .get(`/Departments/${id}`);
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

export const getStatisticalAnalysis = createAsyncThunk('departmentList/getStatisticalAnalysis', async (_, {rejectWithValue}) => {
  try{
  const response = await instance
    .get(`/Departments/GetStatisticalAnalysis`);
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

export const addDepartment = createAsyncThunk('departmentList/addDepartment', async (initialData, {rejectWithValue}) => {
  try{
  const response = await instance
    .post(`/Departments` , initialData);
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

export const updateDepartment = createAsyncThunk('departmentList/updateDepartment', async (initialData,{rejectWithValue}) => {
  try{
  const {id} = initialData;
  const response = await instance
    .put(`/Departments/${id}`, initialData);
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

export const deleteDepartment = createAsyncThunk('departmentList/deleteDepartment', async (initialData, {rejectWithValue}) => {
  try{
  const  id  = initialData;
  const response = await instance
    .delete(`/Departments/${id}`);
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

export const addUserToDepartment = createAsyncThunk('department/addUserToDepartment', async (initialData, {rejectWithValue}) => {
  try{
  const  {userId}  = initialData;
  const  {departmentID}  = initialData;
  const response = await instance
    .put(`/Departments/AddUserToDepartment/${userId}?DepartmentID=${departmentID}`);
    if (response?.status === 200) return initialData;   
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


export const removeUserFromDepartment = createAsyncThunk('departmentList/removeUserFromDepartment', async (initialData, {rejectWithValue}) => {
  try{
  const  id  = initialData; 
  const response = await instance
    .put(`/Departments/RemoveUserFromDepartment/${id}`);
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

export const Invitations = createAsyncThunk('departmentList/Invitations', async (userID, {rejectWithValue}) => {
  try{
  const response = await instance
    .post(`/Invitations?inviteUserId=${userID}`);
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


const departmentsSlice = createSlice({
  name: 'departmentList',
  initialState:{
    loading: false,
    status: "idle",
    departments: [],
    analysis: [],
    error: ''
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
    .addCase(getDepartments.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected"
      state.error = action.payload
    })

    .addCase(getDepartmentById.pending, (state, action) => {
      state.status = 'loading'
      state.loading = true
      state.error = ''
    })
    .addCase(getDepartmentById.fulfilled, (state, action) => {
      state.status = 'Success'
      state.loading = false
      console.log(action.payload)
      const currentDepartments = state.departments.filter((item)=> item.id !==  action.payload.id);
      state.departments = [...currentDepartments, action.payload];
      state.error = ''
    })
    .addCase(getDepartmentById.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected"
      state.error = action.payload
    })

    .addCase(addDepartment.pending, (state, action) => {
      state.loading = true;
      state.status = "loading";
    })
    .addCase(addDepartment.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "idle";
      state.departments.push(action.payload)
      state.error = ''
    })
    .addCase(addDepartment.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected"
      state.error = action.payload
    })

    .addCase(updateDepartment.pending, (state, action) => {
      state.loading = true;
      state.status = "loading";
    })
    .addCase(updateDepartment.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "idle";
      const currentDepartment = state.departments.filter((item)=> item.id !==  action.payload.id);
      state.departments = [...currentDepartment,action.payload];
      state.error = ''
    })
    .addCase(updateDepartment.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected"
      state.error = action.payload
    })

    .addCase(deleteDepartment.pending, (state, action) => {
      state.loading = true;
      state.status = "loading";
    })
    .addCase(deleteDepartment.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "idle";
      state.departments = state.departments.filter((item)=> item.id !== action.payload.id)
      state.error = ''
    })
    .addCase(deleteDepartment.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected"
      state.error = action.payload
    })

    .addCase(removeUserFromDepartment.pending, (state, action) => {
      state.loading = true;
      state.status = "loading";
    })
    builder.addCase(removeUserFromDepartment.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "idle";
      state.error = ''
    })

    .addCase(removeUserFromDepartment.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected"
      state.error = ''
    })

    builder.addCase(addUserToDepartment.pending, (state, action) => {
      state.loading = true
      state.state = 'loading'
    })
    builder.addCase(addUserToDepartment.fulfilled, (state, action) => {
      // const id = action.payload;
      // state.departments = state.departments.filter((item)=> item.id !== id)
      state.loading = false
      state.error = ''
    })
    builder.addCase(addUserToDepartment.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })

    builder.addCase(getStatisticalAnalysis.pending, (state, action) => {
      state.loading = true
      state.error = ''
    })

    builder.addCase(getStatisticalAnalysis.fulfilled, (state, action) => {
      state.loading = false
      state.analysis = action.payload
      state.error = ''
    })
    builder.addCase(getStatisticalAnalysis.rejected, (state, action) => {
      state.loading = false
      state.error = action.type
    })
  }

})

export const selectAllDepartments = (state) => state.departments.departments;
export const selectUser = (state) => state.departments;

export const selectDepartmentById = (state, id) =>
  state.departments.departments.find((item) => item.id === id);

export default departmentsSlice.reducer