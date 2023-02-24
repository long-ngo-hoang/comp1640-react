import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  status: 'loading',// 'loading' | 'succeeded' | 'failed'
  ideas: [],
  error: ''
}

const instance = axios.create({
    baseURL: 'https://localhost:7044'
  });

export const fetchIdeas = createAsyncThunk('ideas/fetchIdeas', async () => {

  const response = await instance
    .get('/Ideas');
    console.log(response.data)
  return response.data;
})

export const addIdeaAsync = createAsyncThunk('ideas/addIdeaAsync', async (payload) => {
  const response = await instance
    .post(`/Ideas` , payload.idea);
  return response.data;
})

export const loadOptions = createAsyncThunk('ideas/loadOptions', async () => {
  const response = await instance
    .get(`/Ideas`);
    console.log(response.data)
  return response.data;
})

export const updateIdeaAsync = createAsyncThunk('ideas/updateIdeaAsync', async (initialIdea) => {
  const {id} = initialIdea;
  try{
  const response = await instance
    .put(`/Ideas/${id}`, initialIdea);
    console.log("update" , response)
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
          addIdea: (state, action) => {
            state.ideas.push(action.payload);
          },     
          removeIdea: (state, action) => {
            const id = action.payload;
            state.ideas = state.ideas.filter((item)=> item.id !== id
            )
            console.log(action);
          },
  },
  extraReducers: builder => {
    builder.addCase(fetchIdeas.pending, (state, action) => {
      state.status = 'loading'
      state.error = ''
    })
    builder.addCase(fetchIdeas.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.ideas = action.payload
      state.error = ''
    })
    builder.addCase(addIdeaAsync.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.ideas = action.payload
      state.error = ''
    })
    builder.addCase(updateIdeaAsync.fulfilled, (state, action) => {
      // console.log("lol hieu", action)
      // if (!action.payload?.id) {
      //   console.log('Update could not complete')
      //   console.log(action.payload)
      //   return;
      // } 
      state.status = 'succeeded'
      const  {id}  = action.payload;
      const idea = state.ideas.filter((item)=> item.id !== id);
      state.ideas = [...idea, action.payload];
      state.error = ''
    })
    builder.addCase(deleteIdeaAsync.fulfilled, (state, action) => {
      const {id} = action.payload;
      state.ideas = state.ideas.filter((item)=> item.id !== id
      )
    })

  }
})

export  const {removeIdea} = ideasSlice.actions;

export const selectAllIdeas = (state) => state.ideas.ideas;

export const selectIdeaById = (state, Id) =>
    state.ideas.ideas.find((idea) => idea.id === Id);

export default ideasSlice.reducer