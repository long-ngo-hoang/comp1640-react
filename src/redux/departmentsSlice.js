import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from './configApi';


export const getDepartmentByQACoordinator = createAsyncThunk('departmentList/getDepartmentByQACoordinator', async (_, {rejectWithValue}) => {
  try{
  const response = await instance
    .get('/Departments/GetDepartmentByQACoordinator');
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
    detailsDepartment: {},
    statisticalAnalysis: [],
    analysis: [],
    error: ''
  },
  reducers:{
  },
  extraReducers: builder => {
    builder
    .addCase(getDepartmentByQACoordinator.pending, (state, action) => {
      state.loading = true;
      state.status = "loading";
    })
    .addCase(getDepartmentByQACoordinator.fulfilled, (state, action) => {
      state.loading = false
      state.detailsDepartment =  action.payload;
      state.error = ''
      state.status = 'idle'
    })
    .addCase(getDepartmentByQACoordinator.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected"
      state.error = action.payload
    })

    .addCase(getDepartments.pending, (state, action) => {
      state.loading = true;
      state.status = "loading";
    })
    .addCase(getDepartments.fulfilled, (state, action) => {
      state.loading = false
      state.departments = action.payload
      state.error = ''
      state.status = 'idle'
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
      state.status = 'idle'
      state.loading = false
      const currentDepartment = state.departments.filter((item)=> item.id !==  action.payload.id);
      state.departments = [...currentDepartment, action.payload];
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
      state.status = 'Success'
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
      state.departments = state.departments.filter((item)=> item.id !== action.meta.arg)
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
      state.status = "idle";

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
      state.status = "idle";

    })
    builder.addCase(getStatisticalAnalysis.fulfilled, (state, action) => {
      state.loading = false
      state.statisticalAnalysis = action.payload
      state.error = ''
      state.status = "idle";

    })
    builder.addCase(getStatisticalAnalysis.rejected, (state, action) => {
      state.loading = false
      state.error = action.type
    })

    builder.addCase(Invitations.pending, (state, action) => {
      state.loading = true
      state.error = ''
    })

    builder.addCase(Invitations.fulfilled, (state, action) => {
      state.loading = false
      state.error = ''
      state.status = "Success"

    })
    builder.addCase(Invitations.rejected, (state, action) => {
      state.loading = false
      state.error = action.type
    })
  }

})
export const selectMyDepartments = (state) => state.departments.detailsDepartment;

export const selectStatisticalAnalysis = (state) => state.departments.statisticalAnalysis;

export const selectAllDepartments = (state) => state.departments.departments;

export const selectUser = (state) => state.departments;

export const selectDepartmentById = (state, id) =>
state.departments.departments.find((item) => item.id === id);

export default departmentsSlice.reducer