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

export const addComment = createAsyncThunk('ideaList/addComment', async (initialData) => {
  const response = await instance
    .post(`/Comments` , initialData);
  return response.data;
})

export const getIdeas = createAsyncThunk('ideaList/getIdeas', async (page) => {
  const response = await instance
    .get(`/Ideas?pageIndex=${page}`);
  return response.data;
})

export const getIdeasByUserId = createAsyncThunk('ideaList/getIdeasByUserId', async (page) => {
  const response = await instance
    .get(`/Ideas/UserId?pageIndex=${page}`);
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

export const getMostPopularIdeas = createAsyncThunk('ideaList/getMostPopularIdeas', async (page) => {
  const response = await instance
    .get(`/Ideas/GetMostPopularIdeas?pageIndex=${page}`);
  return response.data;
})

export const getMostViewedIdeas = createAsyncThunk('ideaList/getMostViewedIdeas', async (page) => {
  const response = await instance
    .get(`/Ideas/GetMostViewedIdeas?pageIndex=${page}`);
  return response.data;
})

export const deleteFile = createAsyncThunk('ideaList/deleteFile', async (initialData) => {
  const {id, ideaId} = initialData
  const response = await instance
    .delete(`Documents/${id}`);
  return ideaId;
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
    })
    .addCase(addComment.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected"
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
    })
    .addCase(getIdeas.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected"
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
    })

    .addCase(getIdeaById.pending, (state, action) => {
      state.status = 'loading';
      state.loading = true;
    })
    .addCase(getIdeaById.fulfilled, (state, action) => {
      state.status = 'idle';
      state.loading = false;
      const currentIdea = state.ideas.filter((item)=> item.id !==  action.payload.id);
      state.ideas = [...currentIdea, action.payload];
    })

    .addCase(addIdea.pending, (state, action) => {
      state.status = 'loading';
      state.loading = true;
    })
    .addCase(addIdea.fulfilled, (state, action) => {
      state.status = 'success';
      state.loading = false;
      state.ideas.push(action.payload)
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
    })

    .addCase(getMostPopularIdeas.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected"
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
    })
    .addCase(getMostViewedIdeas.rejected, (state, action) => {
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
    })
    .addCase(deleteFile.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected"
    })
  }
})

export const selectAllIdeas = (state) => state.ideas.ideas;

export const selectIdeaById = (state, id) =>  
      state.ideas.ideas.find((item) => item.id === id)


export const selectIdea = (state) => state.ideas;

export default ideasSlice.reducer