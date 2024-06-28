import { FetchButton } from "@/components/FetchButton";
import { TaskMessages } from "@/components/TaskMessages";
import { colors } from "@/constants/colors";
import { Task } from "@/helpers/backend";
import { taskSlice } from "@/services/redux/task.slice";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { RadioButton, TextInput, Text } from "react-native-paper";
import { useDispatch } from "react-redux";

const { addOne$, updateOne$ } = taskSlice.actions;
type Params = {
  id?: string;
  title?: string;
  description?: string;
  status?: string;
};

export default function AddScreen() {
  const params = useLocalSearchParams<Params>();
  const type = params?.id ? "EDIT" : "ADD";

  const dispatch = useDispatch();
  const [title, setTitle] = useState(params?.title || "");
  const [description, setDescription] = useState(params?.description || "");
  const [status, setStatus] = useState<Task["status"]>(
    (params?.status as Task["status"]) || "TO_DO"
  );

  const onPress = () => {
    if (type === "ADD") dispatch(addOne$({ description, status, title }));
    if (type === "EDIT" && params.id)
      dispatch(
        updateOne$({ id: parseInt(params.id), description, status, title })
      );
  };

  return (
    <>
      <Stack.Screen
        options={{ title: type === "EDIT" ? "Edit Task" : "Add Task" }}
      />
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <TextInput
            mode="outlined"
            label="Title"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <TextInput
            mode="outlined"
            label="Description"
            value={description}
            multiline={true}
            numberOfLines={6}
            onChangeText={(text) => setDescription(text)}
          />
          <RadioButton.Group
            onValueChange={(s) => setStatus(s as Task["status"])}
            value={status}
          >
            <View style={styles.radioContainer}>
              <RadioButton.Item label="To do" value="TO_DO" />
              <RadioButton.Item label="In progress" value="IN_PROGRESS" />
              <RadioButton.Item label="Done" value="DONE" />
            </View>
          </RadioButton.Group>
        </View>
        <View>
          <TaskMessages />
          <FetchButton type={params?.id ? "EDIT" : "ADD"} onPress={onPress} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 10,
  },
  contentContainer: {
    flex: 1,
    gap: 10,
  },
  radioContainer: {
    justifyContent: "center",
    flexDirection: "row",
  },
  message: {
    color: colors.alert,
  },
});
