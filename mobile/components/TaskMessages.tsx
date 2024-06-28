import { colors } from "@/constants/colors";
import { selectErrorMessages } from "@/services/redux/task.selector";
import { taskSlice } from "@/services/redux/task.slice";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const { clearMessages } = taskSlice.actions;

export const TaskMessages = () => {
  const dispatch = useDispatch();
  const messages = useSelector(selectErrorMessages);

  useEffect(() => {
    dispatch(clearMessages());
  }, []);

  return (
    <>
      {messages.map((message) => (
        <Text key={message} style={styles.message}>
          {message}
        </Text>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  message: {
    color: colors.alert,
  },
});
