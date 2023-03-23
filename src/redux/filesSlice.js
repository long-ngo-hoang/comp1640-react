import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from './configApi';
import axios from 'axios'

export const getS3PreSignedUrl = createAsyncThunk('fileList/getS3PreSignedUrl', async () => {
  const response = await instance
    .get('Ideas/GetPreSignedUrlToUploadDocument');
  return response.data;
})

export const uploadFileToS3 = createAsyncThunk('fileList/uploadFileToS3', async (initialData) => {
  const  {url, data}  = initialData;
  const response = await axios.create({
    maxBodyLength: Infinity,
    baseURL: url,
    headers: { 'Content-Type': 'image/jpeg' }
  }).put("", data);
  return response.data;
})

export const uploadFile = createAsyncThunk('fileList/uploadFile', async (initialData) => {
  const response = await instance
    .post('Documents', initialData);
  return response.data;
})

export const deleteFile = createAsyncThunk('ideaList/deleteFile', async (initialData) => {
  const {name} = initialData
  return name;
})

const filesSlice = createSlice({
  name: 'fileList',
  initialState:{
    loading: false,
    status: "idle",
    files: [],
    url: "null",
    fileName: "null"
  },
  reducers:{
  },
  extraReducers: builder => {
     builder
    .addCase(getS3PreSignedUrl.pending, (state, action) => {
      state.loading = true;
      state.status = "loading";
    })
    .addCase(getS3PreSignedUrl.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "idle"
      console.log(action.payload.fileName)
      state.url = action.payload.preSignedUrl
      state.fileName = action.payload.fileName
      localStorage.setItem('url', action.payload.preSignedUrl)

    })
    .addCase(getS3PreSignedUrl.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected"
    })

    .addCase(uploadFileToS3.pending, (state, action) => {
      state.loading = true;
      state.status = "loading";
    })
    .addCase(uploadFileToS3.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "idle"
      state.url = "null"
      state.files.push("https://d1r3dw8zgjplb.cloudfront.net/documents/" + state.fileName)
    })
    .addCase(uploadFileToS3.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected"
    })

    .addCase(uploadFile.pending, (state, action) => {
      state.loading = true;
      state.status = "loading";
    })
    .addCase(uploadFile.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "idle"
    })
    .addCase(uploadFile.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected"
    })

    .addCase(deleteFile.pending, (state, action) => {
      state.loading = true;
      state.status = "loading";
    })
    .addCase(deleteFile.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "idle"
      state.files = state.files.filter((item)=> item !== action.meta.arg)

    })
    .addCase(deleteFile.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected"
    })
  }
})

export const selectUrl = (state) => state.files.url;

export default filesSlice.reducer