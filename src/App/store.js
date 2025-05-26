import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "@/Feature/TodoSlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});