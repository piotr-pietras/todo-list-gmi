import { Task } from "@/helpers/backend";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Card,
  IconButton,
  Menu,
  Text,
} from "react-native-paper";
import { useRouter } from "expo-router";
import { taskSlice } from "@/services/redux/task.slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectDeletePending } from "@/services/redux/task.selector";
import { colors } from "@/constants/colors";

const { deleteOne$ } = taskSlice.actions;

interface Props extends Task {}

export const TaskBox = (props: Props) => {
  const dispatch = useDispatch();
  const deletePendings = useSelector(selectDeletePending);
  const isPending = deletePendings.includes(props.id);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onEdit = () => {
    router.navigate({
      pathname: "/add",
      params: { ...(props as any) },
    });
    setOpen(false);
  };

  const onDelete = () => {
    dispatch(deleteOne$(props.id));
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
      {isPending && (
        <View style={styles.pending}>
          <ActivityIndicator animating={true} />
        </View>
      )}
      <View
        style={{ ...styles.contentContainer, opacity: isPending ? 0.5 : 1 }}
      >
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
          <Menu.Item leadingIcon={"delete"} onPress={onDelete} title="Delete" />
        </Menu>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: "100%",
    margin: 10,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    maxWidth: "80%",
  },
  pending: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: colors.lightGrey,
    borderRadius: 12,
  },
});
