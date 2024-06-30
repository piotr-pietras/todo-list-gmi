import { TaskBox } from "@/components/TaskBox";
import { colors } from "@/constants/colors";
import { selectIsInit } from "@/services/redux/app.selector";
import { appSlice } from "@/services/redux/app.slice";
import {
  selectTasksInProgress,
  selectTasksNotInProgress,
} from "@/services/redux/task.selector";
import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

const { appInit$ } = appSlice.actions;

export default function HomeScreen() {
  const dispatch = useDispatch();
  const isInit = useSelector(selectIsInit);
  const tasksIP = useSelector(selectTasksInProgress);
  const tasksNIP = useSelector(selectTasksNotInProgress);
  const router = useRouter();

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
        {tasksIP.length ? (
          tasksIP.map((task) => <TaskBox key={task.id} {...task} />)
        ) : (
          <Text style={styles.text} variant="bodyLarge">
            There is no task in progress
          </Text>
        )}
        <View style={styles.divider} />

        <Button
          style={styles.button}
          icon={"plus"}
          mode="elevated"
          onPress={onPress}
        >
          add task
        </Button>

        {tasksNIP.map((task) => (
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
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: colors.lightGrey,
    margin: 10,
  },
  text: {
    margin: 20,
    color: colors.lightGrey,
  },
  button: {
    marginBottom: 10,
  },
});
