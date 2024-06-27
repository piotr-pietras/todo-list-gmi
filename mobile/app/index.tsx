import { getAllTasks } from "@/helpers/backend";
import { Stack, Link } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

export default function HomeScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "TODO List" }} />
      <View style={styles.container}>
        <Link href="/edit">edit</Link>
        <Button
          onPress={() => {
            getAllTasks()
              .then((a) => console.log(a))
              .catch((e) => console.log(e));
          }}
        >
          test fetch
        </Button>
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
