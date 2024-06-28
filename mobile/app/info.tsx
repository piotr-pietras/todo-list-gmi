import { colors } from "@/constants/colors";
import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";

type Params = {
  id?: string;
  title?: string;
  description?: string;
  status?: string;
  timestamp?: string;
};

export default function InfoScreen() {
  const params = useLocalSearchParams<Params>();

  return (
    <>
      <Stack.Screen options={{ title: `Task number: ${params.id}` }} />
      <View style={styles.container}>
        <TextInput
          value={params.title}
          label={"title"}
          mode="outlined"
          disabled
        />
        <TextInput
          value={params.title}
          label={"description"}
          mode="outlined"
          multiline={true}
          numberOfLines={6}
          disabled
        />
        <TextInput
          value={params.status}
          label={"status"}
          mode="outlined"
          disabled
        />
        <TextInput
          value={params.timestamp}
          label={"timestamp"}
          mode="outlined"
          disabled
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
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
