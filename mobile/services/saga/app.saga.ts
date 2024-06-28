import { call, put, takeLeading } from "redux-saga/effects";
import { appSlice } from "../redux/app.slice";
import { getAllTasks } from "@/helpers/backend";
import { taskSlice } from "../redux/task.slice";
import { Alert } from "react-native";

const { setInit } = appSlice.actions;
const { addMany } = taskSlice.actions;

export function* appInitSaga() {
  yield takeLeading(appSlice.actions.appInit$, function* () {
    try {
      const tasks: Awaited<ReturnType<typeof getAllTasks>> = yield call(
        getAllTasks
      );
      yield put(addMany(tasks));
    } catch (error) {
      Alert.alert("Request throws error");
    }
    yield put(setInit(true));
  });
}
