import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from './configApi';

export const getAcademicYears = createAsyncThunk('academicYearList/getAcademicYears', async () => {
  const response = await instance
    .get('/AcademicYears');
  return response.data;
})

export const getAcademicYearById = createAsyncThunk('academicYearList/getAcademicYearById', async (initialData) => {
  const id = initialData;
  const response = await instance
    .get(`/AcademicYears/${id}?pageIndex=1`);
  return response.data;
})

export const addAcademicYear = createAsyncThunk('academicYearList/addAcademicYear', async (initialData) => {
  const response = await instance
    .post(`/AcademicYears` , initialData);
  return response.data;
})

export const updateAcademicYear = createAsyncThunk('academicYearList/updateAcademicYear', async (initialData) => {
  const {id} = initialData;
  const response = await instance
    .put(`/AcademicYears/${id}`, initialData);
  return response.data;
})

export const deleteAcademicYear= createAsyncThunk('academicYearList/deleteAcademicYear', async (initialData) => {
  const  id  = initialData;
  const response = await instance
    .delete(`/AcademicYears/${id}`);
    if (response?.status === 200) return initialData;   
  return response.data;
})

const academicYearsSlice = createSlice({
  name: 'academicYearList',
  initialState:{
    loading: false,
    status: "idle",
    academicYears: [],
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
    })
    .addCase(getAcademicYears.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected"
    })

    .addCase(getAcademicYearById.pending, (state, action) => {
      state.loading = true;
      state.status = "loading";
    })
    .addCase(getAcademicYearById.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "idle"
      state.academicYears[0] = action.payload
    })
    .addCase(getAcademicYearById.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected"
    })

    .addCase(addAcademicYear.pending, (state, action) => {
      state.loading = true;
      state.status = "loading";
    })
    .addCase(addAcademicYear.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "idle";
      state.academicYears.push(action.payload)
    })
    .addCase(addAcademicYear.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected"
    })

    .addCase(updateAcademicYear.pending, (state, action) => {
      state.loading = true;
      state.status = "loading";
    })
    .addCase(updateAcademicYear.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "idle";
      const currentAcademicYear = state.academicYears.filter((item)=> item.id !== action.payload.academicYearsid);
      currentAcademicYear = action.payload;
    })
    .addCase(updateAcademicYear.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected"
    })
    
    .addCase(deleteAcademicYear.pending, (state, action) => {
      state.loading = true;
      state.status = "loading";
    })
    .addCase(deleteAcademicYear.fulfilled, (state, action) => {
      state.academicYears = state.academicYears.filter((item)=> item.id !== action.payload.id)
    })
    .addCase(deleteAcademicYear.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected"
    })
  }
})

export const selectAllAcademicYears = (state) => state.academicYears.academicYears;

export const selectAcademicYearById = (state, id) =>
state.academicYears.academicYears[0];

export default academicYearsSlice.reducer