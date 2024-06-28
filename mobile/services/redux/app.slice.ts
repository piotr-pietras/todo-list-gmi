import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  isInit: boolean;
  isLoading: boolean;
}

const initialState: InitialState = {
  isInit: false,
  isLoading: false,
};

export const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    appInit$: () => {},
    setInit: (state, { payload }: PayloadAction<boolean>) => {
      state.isInit = payload;
    },
    isLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
  },
});
