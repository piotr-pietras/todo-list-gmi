import { fork } from "redux-saga/effects";
import { appInitSaga } from "./app.saga";
import { addTaskSaga, updateTaskSaga } from "./task.saga";

export function* sagas() {
  yield fork(appInitSaga);
  yield fork(addTaskSaga);
  yield fork(updateTaskSaga);
}
