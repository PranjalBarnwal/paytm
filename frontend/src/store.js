import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from "./slice/tokenSlice"

export default configureStore({
    reducer: {
        token:tokenReducer
    },
  });