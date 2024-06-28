import { Store } from "./redux";
import { taskEntity } from "./task.slice";

const selectTaskEntity = taskEntity.getSelectors<Store>(
  (state) => state.taskSlice.entity
);

export const selectAllTasks = (state: Store) =>
  selectTaskEntity.selectAll(state);
export const selectErrorMessages = (state: Store) =>
  state.taskSlice.errorMessages;
