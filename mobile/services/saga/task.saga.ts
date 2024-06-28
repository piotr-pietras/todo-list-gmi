import { call, put, takeLeading } from "redux-saga/effects";
import { appSlice } from "../redux/app.slice";
import { deleteOneTask, postOneTask, updateOneTask } from "@/helpers/backend";
import { taskSlice } from "../redux/task.slice";
import { router } from "expo-router";

const {
  addOne,
  addMessages,
  updateOne,
  daleteOne,
  popDeletePending,
  pushDeletePending,
} = taskSlice.actions;
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
      router.navigate("/");
    } catch (error) {
      yield put(addMessages((error as any)?.message || []));
    }
    yield put(isLoading(false));
  });
}

export function* deleteTaskSaga() {
  yield takeLeading(taskSlice.actions.deleteOne$, function* ({ payload }) {
    try {
      yield put(pushDeletePending(payload));
      yield put(isLoading(true));
      const task: Awaited<ReturnType<typeof deleteOneTask>> = yield call(
        deleteOneTask,
        payload
      );
      yield put(daleteOne(task));
      router.navigate("/");
    } catch (error) {
      yield put(addMessages((error as any)?.message || []));
    }
    yield put(popDeletePending(payload));
    yield put(isLoading(false));
  });
}
