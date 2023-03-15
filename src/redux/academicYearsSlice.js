import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from './api';

const initialState = {
  loading: false,
  academicYears: [],
  error: ''
}

export const getAcademicYears = createAsyncThunk('academicYears/getAcademicYears', async () => {
  const response = await instance
    .get('/AcademicYears');
  return response.data;
})

export const addAcademicYearsAsync = createAsyncThunk('academicYears/addAcademicYearsAsync', async (initialIdea) => {
  const response = await instance
    .post(`/AcademicYears` , initialIdea);
  return response.data;
})

export const updateAcademicYearsAsync = createAsyncThunk('academicYears/updateAcademicYearsAsync', async (initialIdea) => {
  const {id} = initialIdea;
  try{
  const response = await instance
    .put(`/AcademicYears/${id}`, initialIdea);
  return response.data;
  }catch(err)
  {
    return initialIdea;
  }
})

export const deleteAcademicYearsAsync = createAsyncThunk('academicYears/deleteAcademicYearsAsync', async (initialIdea) => {
  const  id  = initialIdea;
  const response = await instance
    .delete(`/AcademicYears/${id}`);
    if (response?.status === 200) return initialIdea;   
  return response.data;
})

const academicYearsSlice = createSlice({
  name: 'academicYears',
  initialState,
  reducers:{
  },
  extraReducers: builder => {
    builder.addCase(getAcademicYears.fulfilled, (state, action) => {
      state.loading = false
      state.academicYears = action.payload
      state.error = ''
    })
    builder.addCase(updateAcademicYearsAsync.fulfilled, (state, action) => {
      // state.loading = false
      // state.categories.push(action.payload)
      // state.error = ''
     state.loading = false
      const  {id}  = action.payload;
      const academicYear = state.academicYears.filter((item)=> item.id !== id);
      state.academicYears = [...academicYear, action.payload];
      state.error = ''
    })
    builder.addCase(deleteAcademicYearsAsync.fulfilled, (state, action) => {
      const id = action.payload;
      state.academicYears = state.academicYears.filter((item)=> item.id !== id)
    })
  }
})

export const selectAllAcademicYears = (state) => state.academicYears.academicYears;


export default academicYearsSlice.reducer