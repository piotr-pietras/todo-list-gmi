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
import { useDispatch, useSelector } from "react-redux";
import { selectTaskPednings } from "@/services/redux/task.selector";
import { colors } from "@/constants/colors";
import { getIconBasedOnStatus } from "@/helpers/icon";
import Animated, {
  SlideInLeft,
  LinearTransition,
  SlideOutLeft,
} from "react-native-reanimated";

const { deleteOne$, updateOne$ } = taskSlice.actions;

interface Props extends Task {}

export const TaskBox = (props: Props) => {
  const dispatch = useDispatch();
  const deletePendings = useSelector(selectTaskPednings);
  const isPending = deletePendings.includes(props.id);
  const [menu, setMenu] = useState(false);
  const router = useRouter();

  const onEdit = () => {
    router.navigate({
      pathname: "/add",
      params: { ...(props as any) },
    });
    setMenu(false);
  };

  const onDelete = () => {
    dispatch(deleteOne$(props.id));
    setMenu(false);
  };

  const onInfo = () => {
    router.navigate({
      pathname: "/info",
      params: { ...(props as any) },
    });
  };

  const onPress = () => {
    if (props.status === "TO_DO") {
      dispatch(updateOne$({ ...props, status: "IN_PROGRESS" }));
    }
    if (props.status === "IN_PROGRESS") {
      dispatch(updateOne$({ ...props, status: "DONE" }));
    }
  };

  const { icon, color } = getIconBasedOnStatus(props.status);

  return (
    <>
      <Animated.View
        entering={SlideInLeft}
        exiting={SlideOutLeft}
        layout={LinearTransition}
      >
        <Card
          onPress={onInfo}
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
            <IconButton
              onPress={onPress}
              icon={icon}
              iconColor={color}
              size={30}
            />
            <Text style={styles.title} numberOfLines={2} variant="bodyLarge">
              {props.title}
            </Text>
            <Menu
              visible={menu}
              onDismiss={() => setMenu(false)}
              anchor={
                <IconButton
                  onPress={() => setMenu(true)}
                  icon={"menu"}
                  size={30}
                />
              }
            >
              <Menu.Item leadingIcon={"pencil"} onPress={onEdit} title="Edit" />
              <Menu.Item
                leadingIcon={"delete"}
                onPress={onDelete}
                title="Delete"
              />
            </Menu>
          </View>
        </Card>
      </Animated.View>
    </>
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
