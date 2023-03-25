import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from './configApi';

export const getAcademicYears = createAsyncThunk('academicYearList/getAcademicYears', async (_, {rejectWithValue}) => {
  try{
  const response = await instance
    .get('/AcademicYears');
  return response.data;
  } catch(error){
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

export const getAcademicYearById = createAsyncThunk('academicYearList/getAcademicYearById', async (initialData, {rejectWithValue}) => {
  try{
  const id = initialData;
  const response = await instance
    .get(`/AcademicYears/${id}?pageIndex=1`);
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

export const addAcademicYear = createAsyncThunk('academicYearList/addAcademicYear', async (initialData, {rejectWithValue}) => {
  try{
  const response = await instance
    .post(`/AcademicYears` , initialData);
  return response.data;
  } catch(error){
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

export const updateAcademicYear = createAsyncThunk('academicYearList/updateAcademicYear', async (initialData, {rejectWithValue}) => {
  try{
  const {id} = initialData;
  const response = await instance
    .put(`/AcademicYears/${id}`, initialData);
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

export const deleteAcademicYear= createAsyncThunk('academicYearList/deleteAcademicYear', async (initialData, {rejectWithValue}) => {
  try{
  const  id  = initialData;
  const response = await instance
    .delete(`/AcademicYears/${id}`);
    if (response?.status === 200) return initialData;   
  return response.data;
  } catch(error){
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

const academicYearsSlice = createSlice({
  name: 'academicYearList',
  initialState:{
    loading: false,
    status: "idle",
    academicYears: [],
    error: ''
  },
  reducers:{
  },
  extraReducers: builder => {
     builder
    .addCase(getAcademicYears.pending, (state, action) => {
      state.loading = true;
      state.status = "loading";
    })
    .addCase(getAcademicYears.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "idle"
      state.academicYears = action.payload
      state.error = ''
    })
    .addCase(getAcademicYears.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload
    })

    .addCase(getAcademicYearById.pending, (state, action) => {
      state.loading = true;
      state.status = "loading";
    })
    .addCase(getAcademicYearById.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "idle"
      const currentAcademicYear = state.academicYears.filter((item)=> item.id !==  action.payload.id);
      state.academicYears = [...currentAcademicYear, action.payload];
      state.error = ''
    })
    .addCase(getAcademicYearById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload
    })

    .addCase(addAcademicYear.pending, (state, action) => {
      state.loading = true;
      state.status = "loading";
    })
    .addCase(addAcademicYear.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "idle";
      state.academicYears.push(action.payload)
      state.error = ''
    })
    .addCase(addAcademicYear.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload
    })

    .addCase(updateAcademicYear.pending, (state, action) => {
      state.loading = true;
      state.status = "loading";
    })
    .addCase(updateAcademicYear.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "idle";
      // let currentAcademicYear = state.academicYears.find((item)=> item.id !== action.payload.id)
      // state.academicYears =[...currentAcademicYear, action.payload] 
      state.error = ''
    })
    .addCase(updateAcademicYear.rejected, (state, action) => {
      state.loading = false;
      state.status = action.payload
    })
    
    .addCase(deleteAcademicYear.pending, (state, action) => {
      state.loading = true;
      state.status = "loading";
    })
    .addCase(deleteAcademicYear.fulfilled, (state, action) => {
      state.academicYears = state.academicYears.filter((item)=> item.id !== action.payload.id)
      state.error = ''
    })
    .addCase(deleteAcademicYear.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload
    })
  }
})

export const selectAllAcademicYears = (state) => state.academicYears.academicYears;

export const selectAcademicYearById = (state, id) =>
    state.academicYears.academicYears.find((item) => item.id === id);

export default academicYearsSlice.reducer