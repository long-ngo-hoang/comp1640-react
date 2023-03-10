import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  academicYears: [],
  error: ''
}

const instance = axios.create({
    baseURL: 'https://localhost:7044'
  });

export const getAcademicYears = createAsyncThunk('academicYears/getAcademicYears', async () => {
  const response = await instance
    .get('/AcademicYears');
    console.log(response.data)
  return response.data;
})
export const addAcademicYearsAsync = createAsyncThunk('academicYears/addAcademicYearsAsync', async (initialIdea) => {
  console.log(initialIdea)
  const response = await instance
    .post(`/AcademicYears` , initialIdea);
  return response.data;
})

export const updateAcademicYearsAsync = createAsyncThunk('academicYears/updateAcademicYearsAsync', async (initialIdea) => {
  const {id} = initialIdea;
  try{
  const response = await instance
    .put(`/AcademicYears/${id}`, initialIdea);
    console.log("update" , response)
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
      // console.log(action.payload)
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