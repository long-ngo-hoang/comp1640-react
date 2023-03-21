import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from './configApi';

export const addComment = createAsyncThunk('commentList/addComment', async (initialData) => {
  const response = await instance
    .post(`/Comments` , initialData);
  return response.data;
})

export const updateComment = createAsyncThunk('comments/updateComment', async (initialData) => {
  const {id} = initialData;
  try{
  const response = await instance
    .put(`/Comments/${id}`, initialData);
  return response.data;
  }catch(err)
  {
    return initialData;
  }
})

export const deleteComment = createAsyncThunk('comments/deleteComment', async (initialData) => {
  const  id  = initialData;
  const response = await instance
    .delete(`/Comments/${id}`);
    if (response?.status === 200) return initialData;   
  return response.data;
})

const categoriesSlice = createSlice({
  name: 'commentList',
  initialState: {
    loading: false,
    comments: [],
    error: ''
  },
  reducers:{   
  },
  extraReducers: builder => {
    builder
    .addCase(addComment.pending, (state, action) => {
      state.loading = true;
      state.status = "loading";
    })
    .addCase(addComment.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "idle"
      state.categories = action.payload
    })
    .addCase(addComment.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected"
    })

    .addCase(updateComment.pending, (state, action) => {
      state.loading = true;
      state.status = "loading";
    })
    .addCase(updateComment.fulfilled, (state, action) => {
     state.loading = false
      const  {id}  = action.payload;
      const comment = state.comments.filter((comment)=> comment.id !== id);
      state.comments = [...comment, action.payload];
      state.error = ''
    })
    .addCase(updateComment.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected"
    })

    .addCase(deleteComment.pending, (state, action) => {
      state.loading = true;
      state.status = "loading";
    })
    .addCase(deleteComment.fulfilled, (state, action) => {
      const id = action.payload;
      state.comments = state.comments.filter((item)=> item.id !== id)
    })
    .addCase(deleteComment.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected"
    })
  }
})

export const selectAllComments = (state) => state.comment.comments;

export const selectCommentsById = (state, Id) =>
    state.comment.comments.find((item) => item.id === Id);

export default categoriesSlice.reducer