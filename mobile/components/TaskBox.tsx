import { Task } from "@/helpers/backend";
import { View, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";

interface Props extends Task {}

export const TaskBox = (props: Props) => {
  return (
    <Card
      mode={"elevated"}
      style={{
        ...styles.container,
        backgroundColor: "white",
        opacity: props.status === "DONE" ? 0.2 : 1,
      }}
    >
      <Text numberOfLines={2} variant="bodyLarge">
        {props.title}
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: "100%",
    margin: 10,
    padding: 10,
  },
});
