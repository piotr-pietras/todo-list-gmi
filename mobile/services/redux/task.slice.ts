import {
  EntityState,
  PayloadAction,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { Task } from "@/helpers/backend";

export const taskEntity = createEntityAdapter({
  selectId: (task: Task) => task.id,
  sortComparer: (a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  },
});

interface InitialState {
  entity: EntityState<Task, number>;
  errorMessages: string[];
  pendings: number[];
}

const initialState: InitialState = {
  entity: taskEntity.getInitialState(),
  errorMessages: [],
  pendings: [],
};

export const taskSlice = createSlice({
  name: "taskSlice",
  initialState,
  reducers: {
    addMessages: (state, { payload }: PayloadAction<string[]>) => {
      state.errorMessages = payload;
    },
    clearMessages: (state) => {
      state.errorMessages = [];
    },
    addMany: (state, { payload }: PayloadAction<Task[]>) => {
      taskEntity.addMany(state.entity, payload);
    },
    addOne: (state, { payload }: PayloadAction<Task>) => {
      taskEntity.addOne(state.entity, payload);
    },
    addOne$: (
      _,
      _2: PayloadAction<Pick<Task, "title" | "description" | "status">>
    ) => {},
    updateOne: (state, { payload }: PayloadAction<Task>) => {
      taskEntity.updateOne(state.entity, {
        id: payload.id,
        changes: payload,
      });
    },
    updateOne$: (
      _,
      _2: PayloadAction<Pick<Task, "id" | "title" | "description" | "status">>
    ) => {},
    daleteOne: (state, { payload }: PayloadAction<Task>) => {
      taskEntity.removeOne(state.entity, payload.id);
    },
    deleteOne$: (_, _2: PayloadAction<number>) => {},
    pushPending: (state, { payload }: PayloadAction<number>) => {
      state.pendings = [...state.pendings, payload];
    },
    popPending: (state, { payload }: PayloadAction<number>) => {
      state.pendings = state.pendings.filter((id) => id !== payload);
    },
  },
});
