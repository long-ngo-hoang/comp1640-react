import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from './configApi';

// export const addComment = createAsyncThunk('commentList/addComment', async (initialData) => {
//   const response = await instance
//     .post(`/Comments` , initialData);
//   return response.data;
// })

export const updateComment = createAsyncThunk('commentList/updateComment', async (initialData, {rejectWithValue}) => {
  const {id} = initialData;
  try{
  const response = await instance
    .put(`/Comments/${id}`, initialData);
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

export const deleteComment = createAsyncThunk('commentList/deleteComment', async (initialData, {rejectWithValue}) => {
  try{
  const  id  = initialData;
  const response = await instance
    .delete(`/Comments/${id}`);
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
    // .addCase(addComment.pending, (state, action) => {
    //   state.loading = true;
    //   state.status = "loading";
    // })
    // .addCase(addComment.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.status = "idle"
    //   state.comments.push(action.payload)
    // })
    // .addCase(addComment.rejected, (state, action) => {
    //   state.loading = false;
    //   state.status = "rejected"
    // })

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
      state.error = action.payload
    })

    .addCase(deleteComment.pending, (state, action) => {
      state.loading = true;
      state.status = "loading";
    })
    .addCase(deleteComment.fulfilled, (state, action) => {
      const id = action.payload;
      state.comments = state.comments.filter((item)=> item.id !== id)
      state.error = ''
    })
    .addCase(deleteComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload
    })
  }
})

export const selectAllComments = (state) => state.comment.comments;

export const selectCommentsById = (state, Id) =>
    state.comment.comments.find((item) => item.id === Id);

export default categoriesSlice.reducer