import { createSelector } from "@reduxjs/toolkit";
import { Store } from "./redux";
import { taskEntity } from "./task.slice";

const selectTaskEntity = taskEntity.getSelectors<Store>(
  (state) => state.taskSlice.entity
);

export const selectAllTasks = (state: Store) =>
  selectTaskEntity.selectAll(state);
export const selectTasksInProgress = createSelector(selectAllTasks, (tasks) =>
  tasks.filter(({ status }) => status === "IN_PROGRESS")
);
export const selectTasksNotInProgress = createSelector(
  selectAllTasks,
  (tasks) => tasks.filter(({ status }) => status !== "IN_PROGRESS")
);
export const selectErrorMessages = (state: Store) =>
  state.taskSlice.errorMessages;
export const selectTaskPednings = (state: Store) => state.taskSlice.pendings;
