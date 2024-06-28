import { TaskBox } from "@/components/TaskBox";
import { selectIsInit } from "@/services/redux/app.selector";
import { appSlice } from "@/services/redux/app.slice";
import { selectAllTasks } from "@/services/redux/task.selector";
import { Stack, Link, router } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

const { appInit$ } = appSlice.actions;

export default function HomeScreen() {
  const dispatch = useDispatch();
  const isInit = useSelector(selectIsInit);
  const tasks = useSelector(selectAllTasks);

  const onPress = () => {
    router.navigate("/add");
  };

  useEffect(() => {
    if (!isInit) {
      dispatch(appInit$());
    }
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: "TODO List" }} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Button icon={"plus"} mode="elevated" onPress={onPress}>
          add task
        </Button>
        {tasks.map((task) => (
          <TaskBox key={task.id} {...task} />
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});
