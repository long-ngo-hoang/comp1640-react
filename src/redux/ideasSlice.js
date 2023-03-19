import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from './api';

export const getIdeas = createAsyncThunk('ideaList/getIdeas', async () => {
  const response = await instance
    .get('/Ideas?pageIndex=1');
  return response.data;
})

export const getIdeasByUserId = createAsyncThunk('ideaList/getIdeasByUserId', async () => {
  const response = await instance
    .get('/Ideas/UserId?pageIndex=1');
  return response.data;
})

export const addIdea = createAsyncThunk('ideaList/addIdea', async (initialData) => {
  const response = await instance
    .post(`/Ideas` , initialData);
  return response.data;
})

export const getIdeaById = createAsyncThunk('ideaList/getIdeaById', async (initialData) => {
  const  id  = initialData;
  const response = await instance
    .get(`/Ideas/${id}`);
  return response.data;
  
})

export const updateIdea = createAsyncThunk('ideaList/updateIdea', async (initialData) => {
  const {id} = initialData;
  
  try{
  const response = await instance
    .put(`/Ideas/${id}`, initialData);
  return response.data;
  }catch(err)
  {
    return initialData;
  }
})

export const deleteIdea = createAsyncThunk('ideaList/deleteIdea', async (initialData) => {
  const  id  = initialData;
  const response = await instance
    .delete(`/Ideas/${id}`);
    if (response?.status === 200) return initialData;   
  return response.data;
})

const ideasSlice = createSlice({
  name: 'ideaList',
  initialState : {
      status: 'idle',
      loading: false,
      pageindex: 1,
      totalpage: 1,
      ideas: [],
  },
  reducers:{
  },
  extraReducers: builder => {
    builder
    .addCase(getIdeas.pending, (state, action) => {
      state.status = 'loading';
      state.loading = true;
    })

    .addCase(getIdeas.fulfilled, (state, action) => {
      state.status = 'idle';
      state.loading = false;
      state.pageindex = action.payload.pageIndex;
      state.totalpage = action.payload.totalPage;
      state.ideas = action.payload.ideas
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
      state.ideas = action.payload.ideas
    })

    .addCase(getIdeaById.pending, (state, action) => {
      state.status = 'loading';
      state.loading = true;
    })
    .addCase(getIdeaById.fulfilled, (state, action) => {
      state.status = 'idle';
      state.loading = false;
      state.ideas[0] = action.payload
      console.log(action.payload)
    })

    .addCase(addIdea.pending, (state, action) => {
      state.status = 'loading';
      state.loading = true;
    })
    .addCase(addIdea.fulfilled, (state, action) => {
      state.status = 'idle';
      state.loading = false;
      state.ideas.ideas.push(action.payload)
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

    .addCase(deleteIdea.pending, (state, action) => {
      state.status = 'loading';
      state.loading = true;
    })
    .addCase(deleteIdea.fulfilled, (state, action) => {
      state.status = 'idle';
      state.loading = false;
      state.ideas = state.ideas.filter((item)=> item.id !== action.payload.id)
    })
  }
})

export const selectAllIdeas = (state) => state.ideas.ideas;

export const selectIdeaById = (state) => state.ideas.ideas[0]

export const selectIdea = (state) => state.ideas;


export default ideasSlice.reducer