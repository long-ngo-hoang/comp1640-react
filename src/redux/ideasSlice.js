import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from './api';

const initialState = {
  status: 'loading',// 'loading' | 'succeeded' | 'failed'
  pageindex: 1,
  totalpage: 1,
  ideas: [],
  error: ''
}



export const fetchIdeas = createAsyncThunk('ideas/fetchIdeas', async () => {
  const response = await instance
    .get('/Ideas?pageIndex=1');
  return response.data;
})

export const fetchIdeasByUserId = createAsyncThunk('ideas/fetchIdeasByUserId', async () => {
  const response = await instance
    .get('/Ideas/UserId?pageIndex=1');
  return response.data;
})

export const addIdeaAsync = createAsyncThunk('ideas/addIdeaAsync', async (initialIdea) => {
  const response = await instance
    .post(`/Ideas` , initialIdea);
  return response.data;
})

export const getIdeaByID = createAsyncThunk('ideas/getIdeaByID', async (initialIdea) => {
  const  id  = initialIdea;
  const response = await instance
    .get(`/Ideas/${id}`);
  return response.data;
})

export const updateIdeaAsync = createAsyncThunk('ideas/updateIdeaAsync', async (initialIdea) => {
  const {id} = initialIdea;
  
  try{
  const response = await instance
    .put(`/Ideas/${id}`, initialIdea);
  return response.data;
  }catch(err)
  {
    return initialIdea;
  }
})

export const deleteIdeaAsync = createAsyncThunk('ideas/deleteIdeaAsync', async (initialIdea) => {
  const  id  = initialIdea;
  const response = await instance
    .delete(`/Ideas/${id}`);
    if (response?.status === 200) return initialIdea;   
  return response.data;
})

const ideasSlice = createSlice({
  name: 'ideas',
  initialState,
  reducers:{
  },
  extraReducers: builder => {
    builder.addCase(fetchIdeas.pending, (state, action) => {
      state.status = 'loading'
      state.error = ''
    })

    builder.addCase(fetchIdeas.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.ideas = action.payload.ideas
      state.error = ''
    })

    builder.addCase(fetchIdeasByUserId.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.ideas = action.payload.ideas
      state.error = ''
    })

    builder.addCase(getIdeaByID.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.ideas = action.payload
      state.error = ''
    })

    builder.addCase(addIdeaAsync.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.ideas.ideas.push(action.payload)
      state.error = ''
    })

    builder.addCase(updateIdeaAsync.fulfilled, (state, action) => {
      // if (!action.payload?.id) {
      //   return;
      // } 
      state.status = 'succeeded'
      const  {id}  = action.payload;
      const idea = state.ideas.filter((item)=> item.id !== id);
      state.ideas = [...idea, action.payload];
      state.error = ''
    })

    builder.addCase(deleteIdeaAsync.fulfilled, (state, action) => {
      const id = action.payload;
      state.ideas = state.ideas.filter((item)=> item.id !== id
      )
    })

  }
})

export const selectAllIdeas = (state) => state.ideas.ideas;

export const selectIdeaById = (state, Id) => state.ideas.ideas.find((idea) => idea.id === Id);

export const selectIdea = (state) => state.ideas;


export default ideasSlice.reducer