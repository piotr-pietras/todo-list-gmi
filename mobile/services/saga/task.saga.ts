import { call, put, takeLeading } from "redux-saga/effects";
import { appSlice } from "../redux/app.slice";
import { postOneTask, updateOneTask } from "@/helpers/backend";
import { taskSlice } from "../redux/task.slice";
import { router } from "expo-router";

const { addOne, clearMessages, addMessages, updateOne } = taskSlice.actions;
const { isLoading } = appSlice.actions;

export function* addTaskSaga() {
  yield takeLeading(taskSlice.actions.addOne$, function* ({ payload }) {
    try {
      yield put(isLoading(true));
      const task: Awaited<ReturnType<typeof postOneTask>> = yield call(
        postOneTask,
        payload
      );
      yield put(addOne(task));
      yield put(clearMessages());
      router.navigate("/");
    } catch (error) {
      yield put(addMessages((error as any)?.message || []));
    }
    yield put(isLoading(false));
  });
}

export function* updateTaskSaga() {
  yield takeLeading(taskSlice.actions.updateOne$, function* ({ payload }) {
    try {
      yield put(isLoading(true));
      const task: Awaited<ReturnType<typeof updateOneTask>> = yield call(
        updateOneTask,
        payload
      );
      yield put(updateOne(task));
      yield put(clearMessages());
      router.navigate("/");
    } catch (error) {
      yield put(addMessages((error as any)?.message || []));
    }
    yield put(isLoading(false));
  });
}
