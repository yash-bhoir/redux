import { configureStore } from "@reduxjs/toolkit";
import todoReducer from '../features/todo/todoSlice'; // Update the path accordingly


export const store = configureStore({
    reducer: {
      todo: todoReducer,
    },
  });
  
  export default store;