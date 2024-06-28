import { Store } from "./redux";

export const selectIsLoading = (state: Store) => state.appSlice.isLoading;
export const selectIsInit = (state: Store) => state.appSlice.isInit;
