import { Task } from "@/helpers/backend";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Card, IconButton, Menu, Text } from "react-native-paper";
import { useRouter } from "expo-router";

interface Props extends Task {}

export const TaskBox = (props: Props) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onEdit = () => {
    router.navigate({
      pathname: "/add",
      params: { ...(props as any) },
    });
    setOpen(false);
  };

  return (
    <Card
      mode={"elevated"}
      style={{
        ...styles.container,
        backgroundColor: "white",
        opacity: props.status === "DONE" ? 0.2 : 1,
      }}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={2} variant="bodyLarge">
          {props.title}
        </Text>
        <Menu
          visible={open}
          onDismiss={() => setOpen(false)}
          anchor={
            <IconButton onPress={() => setOpen(true)} icon={"menu"} size={24} />
          }
        >
          <Menu.Item leadingIcon={"pencil"} onPress={onEdit} title="Edit" />
          <Menu.Item leadingIcon={"delete"} onPress={() => {}} title="Delete" />
        </Menu>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: "100%",
    margin: 10,
    padding: 10,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    maxWidth: "80%",
  },
});
