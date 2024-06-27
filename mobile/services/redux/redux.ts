import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { AppSlice } from "./app.slice";
import { TaskSlice } from "./task.slice";

const reducer = combineReducers({
  appSlice: AppSlice.reducer,
  taskSlice: TaskSlice.reducer,
});

export const store = configureStore({ reducer });

const states = store.getState();
export type Store = typeof states;
