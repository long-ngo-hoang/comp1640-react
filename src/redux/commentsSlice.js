import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from './api';

const initialState = {
  loading: false,
  comments: [],
  error: ''
}

export const addCommentAsync = createAsyncThunk('comments/addCommentsAsync', async (initialIdea) => {
  console.log(initialIdea)
  const response = await instance
    .post(`/Comments` , initialIdea);
  return response.data;
})

export const updateCommentAsync = createAsyncThunk('comments/updateCommentsAsync', async (initialIdea) => {
  const {id} = initialIdea;
  try{
  const response = await instance
    .put(`/Comments/${id}`, initialIdea);
    console.log("update" , response)
  return response.data;
  }catch(err)
  {
    return initialIdea;
  }
})

export const deleteCommentAsync = createAsyncThunk('comments/deleteCommentAsync', async (initialIdea) => {
  const  id  = initialIdea;
  const response = await instance
    .delete(`/Comments/${id}`);
    if (response?.status === 200) return initialIdea;   
  return response.data;
})

const categoriesSlice = createSlice({
  name: 'comment',
  initialState,
  reducers:{
        //   addCategories: (state, action) => {
        //     state.categories = action.payload;
        //   }     
  },
  extraReducers: builder => {
    // builder.addCase(getCategories.fulfilled, (state, action) => {
    //   state.loading = false
    //   state.categories = action.payload
    //   state.error = ''
    // })
    builder.addCase(addCommentAsync.fulfilled, (state, action) => {
      state.loading = false
      console.log(action.payload)
      state.comments.push(action.payload)
      state.error = ''
    })

    builder.addCase(updateCommentAsync.fulfilled, (state, action) => {
      // state.loading = false
      // console.log(action.payload)
      // state.categories.push(action.payload)
      // state.error = ''
     state.loading = false
      const  {id}  = action.payload;
      const comment = state.comments.filter((comment)=> comment.id !== id);
      state.comments = [...comment, action.payload];
      state.error = ''
    })
    builder.addCase(deleteCommentAsync.fulfilled, (state, action) => {
      const id = action.payload;
      state.comments = state.comments.filter((item)=> item.id !== id)
    })
  }
})

export const selectAllComments = (state) => state.comment.comments;

export const selectCommentsById = (state, Id) =>
    state.comment.comments.find((item) => item.id === Id);

export default categoriesSlice.reducer