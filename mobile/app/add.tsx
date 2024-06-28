import { colors } from "@/constants/colors";
import { Task } from "@/helpers/backend";
import { selectIsLoading } from "@/services/redux/app.selector";
import { selectErrorMessages } from "@/services/redux/task.selector";
import { taskSlice } from "@/services/redux/task.slice";
import { Stack } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, RadioButton, TextInput, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const { addOne$ } = taskSlice.actions;

export default function AddScreen() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Task["status"]>("TO_DO");
  const isLoading = useSelector(selectIsLoading);
  const messages = useSelector(selectErrorMessages);

  const onPress = () => {
    dispatch(addOne$({ description, status, title }));
  };

  return (
    <>
      <Stack.Screen options={{ title: "Add Task" }} />
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
          {messages.map((message) => (
            <Text key={message} style={styles.message}>
              {message}
            </Text>
          ))}
          <Button
            disabled={isLoading}
            loading={isLoading}
            onPress={onPress}
            mode="contained"
            icon={"plus"}
          >
            Add
          </Button>
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
  },
  radioContainer: {
    marginTop: 20,
    gap: 10,
    justifyContent: "center",
    flexDirection: "row",
  },
  message: {
    color: colors.alert,
  },
});
