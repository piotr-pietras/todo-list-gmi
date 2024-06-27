import { createSlice } from "@reduxjs/toolkit";

interface InitialState {}

const initialState: InitialState = {};

export const AppSlice = createSlice({
  name: "AppSlice",
  initialState,
  reducers: {
    none: () => {},
  },
});
