import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { appSlice } from "./app.slice";
import { taskSlice } from "./task.slice";
import createSagaMiddleware from "redux-saga";
import { sagas } from "../saga";

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  [appSlice.name]: appSlice.reducer,
  [taskSlice.name]: taskSlice.reducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(sagas);

const states = store.getState();
export type Store = typeof states;
