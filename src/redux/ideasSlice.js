import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from './configApi';

const initialState = {
  status: 'loading',// 'loading' | 'succeeded' | 'failed'
  loading: true,
  pageindex: 1,
  totalpage: [],
  ideas: [],
  error: ''
}

export const addComment = createAsyncThunk('ideaList/addComment', async (initialData, {rejectWithValue}) => {
  try{
  const response = await instance
    .post(`/Comments` , initialData);
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

export const getIdeas = createAsyncThunk('ideaList/getIdeas', async (page, {rejectWithValue}) => {
  try{
  const response = await instance
    .get(`/Ideas?pageIndex=${page}`);
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

export const getIdeasByUserId = createAsyncThunk('ideaList/getIdeasByUserId', async (page, {rejectWithValue}) => {
  try{
  const response = await instance
    .get(`/Ideas/UserId?pageIndex=${page}`);
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

export const addIdea = createAsyncThunk('ideaList/addIdea', async (initialData, {rejectWithValue}) => {
  try{
  const response = await instance
    .post(`/Ideas` , initialData);
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

export const getIdeaById = createAsyncThunk('ideaList/getIdeaById', async (initialData, {rejectWithValue}) => {
  try{
  const  id  = initialData;
  const response = await instance
    .get(`/Ideas/${id}`);
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

export const updateIdea = createAsyncThunk('ideaList/updateIdea', async (initialData, {rejectWithValue}) => {
  const {id} = initialData;
  try{
  const response = await instance
    .put(`/Ideas/${id}`, initialData);
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

export const deleteIdea = createAsyncThunk('ideaList/deleteIdea', async (initialData, {rejectWithValue}) => {
  try{
  const  id  = initialData;
  const response = await instance
    .delete(`/Ideas/${id}`);
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

export const getMostPopularIdeas = createAsyncThunk('ideaList/getMostPopularIdeas', async (page,{rejectWithValue}) => {
  try{
  const response = await instance
    .get(`/Ideas/GetMostPopularIdeas?pageIndex=${page}`);
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

export const getMostViewedIdeas = createAsyncThunk('ideaList/getMostViewedIdeas', async (page, {rejectWithValue}) => {
  try{
  const response = await instance
    .get(`/Ideas/GetMostViewedIdeas?pageIndex=${page}`);
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

export const deleteFile = createAsyncThunk('ideaList/deleteFile', async (initialData, {rejectWithValue}) => {
  try{
  const {id, ideaId} = initialData
  const response = await instance
    .delete(`Documents/${id}`);
  return ideaId;
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

const ideasSlice = createSlice({
  name: 'ideaList',
  initialState,
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
      state.status = "success"
      const currentIdea = state.ideas.find((item)=> item.id === action.payload.ideaId);
      currentIdea.comments.splice(0, 0, action.payload)
      state.error = ''
    })
    .addCase(addComment.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected"
      state.error = action.payload
    })

    .addCase(getIdeas.pending, (state, action) => {
      state.status = 'loading';
      state.loading = true;
    })
    .addCase(getIdeas.fulfilled, (state, action) => {
      state.status = 'idle';
      state.loading = false;
      state.pageindex = action.payload.pageIndex;
      state.totalpage = action.payload.totalPage;
      const ideas =  action.payload.ideas
      state.ideas = ideas
      state.error = ''
    })
    .addCase(getIdeas.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected"
      state.error = action.payload
    })

    .addCase(getIdeasByUserId.pending, (state, action) => {
      state.status = 'loading';
      state.loading = true;
    })
    .addCase(getIdeasByUserId.fulfilled, (state, action) => {
      state.status = 'idle';
      state.loading = false;
      state.pageindex = action.payload.pageIndex;
      state.totalpage = action.payload.totalPage;
      // state.ideas = action.payload.ideas
      const ideas =  action.payload.ideas
      state.ideas = ideas
      state.error = ''
    })
    .addCase(getIdeasByUserId.rejected, (state, action) => {
      state.status = 'loading';
      state.loading = true;
      state.error = action.payload
    })

    .addCase(getIdeaById.pending, (state, action) => {
      state.status = 'loading';
      state.loading = true;
      state.error = action.payload
    })
    .addCase(getIdeaById.fulfilled, (state, action) => {
      state.status = 'idle';
      state.loading = false;
      const currentIdea = state.ideas.filter((item)=> item.id !==  action.payload.id);
      state.ideas = [...currentIdea, action.payload];
      state.error = ''
    })
    .addCase(getIdeaById.rejected, (state, action) => {
      state.status = 'loading';
      state.loading = true;
      state.error = action.payload
    })

    .addCase(addIdea.pending, (state, action) => {
      state.status = 'loading';
      state.loading = true;
    })
    .addCase(addIdea.fulfilled, (state, action) => {
      state.status = 'success';
      state.loading = false;
      state.ideas.push(action.payload)
      state.error = ''
    })
    .addCase(addIdea.rejected, (state, action) => {
      state.status = 'rejected';
      state.loading = false;
      state.error = action.payload
    })

    .addCase(updateIdea.pending, (state, action) => {
      state.status = 'loading';
      state.loading = true;
    })
    .addCase(updateIdea.fulfilled, (state, action) => {
      state.status = 'idle';
      state.loading = false;
      let currentIdea = state.ideas.filter((item)=> item.id !== action.payload.id);
      currentIdea = action.payload;
    })
    .addCase(updateIdea.rejected, (state, action) => {
      state.status = 'rejected';
      state.loading = false;
      state.error = action.payload
    })

    .addCase(deleteIdea.pending, (state, action) => {
      state.status = 'loading';
      state.loading = true;
    })
    .addCase(deleteIdea.fulfilled, (state, action) => {
      state.status = 'idle';
      state.loading = false;
      state.ideas = state.ideas.filter((item)=> item.id !== action.payload.id)
    })
    .addCase(deleteIdea.rejected, (state, action) => {
      state.status = 'rejected';
      state.loading = false;
      state.error = action.payload
    })
      //GetMostPopularIdeas
    .addCase(getMostPopularIdeas.pending, (state, action) => {
      state.status = 'loading';
      state.loading = true;
    })

    .addCase(getMostPopularIdeas.fulfilled, (state, action) => {
      state.status = 'idle';
      state.loading = false;
      const ideas =  action.payload.ideas
      state.ideas = ideas
      state.error = ''
    })

    .addCase(getMostPopularIdeas.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected"
      state.action = action.payload
    })
      //GetMostViewedIdeas
    .addCase(getMostViewedIdeas.pending, (state, action) => {
      state.status = 'loading';
      state.loading = true;
    })

    .addCase(getMostViewedIdeas.fulfilled, (state, action) => {
      state.status = 'idle';
      state.loading = false;
      const ideas =  action.payload.ideas
      state.ideas = ideas
      state.error = ''
    })
    .addCase(getMostViewedIdeas.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected"
      state.error = action.payload
    })

    .addCase(deleteFile.pending, (state, action) => {
      state.loading = true;
      state.status = "loading";
    })
    .addCase(deleteFile.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "idle"
      state.error = ''
    })
    .addCase(deleteFile.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected"
      state.error = action.payload
    })
  }
})

export const selectAllIdeas = (state) => state.ideas.ideas;

export const selectIdeaById = (state, id) =>  
      state.ideas.ideas.find((item) => item.id === id)


export const selectIdea = (state) => state.ideas;

export default ideasSlice.reducer