import { createSlice } from '@reduxjs/toolkit';

export const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        token:"",
        username:""
    },
    reducers: {
      addToken:(state,action)=>{
        state.token=action.payload;
      },
      addName:(state,action)=>{
        state.username=action.payload;
      }
    },
  });

export const { addToken,addName } = tokenSlice.actions;

export default tokenSlice.reducer;