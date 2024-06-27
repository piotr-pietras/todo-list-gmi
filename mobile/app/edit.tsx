import { Stack, Link } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function EditScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Edit Task" }} />
      <View style={styles.container}>
        <Link href="/">home</Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
