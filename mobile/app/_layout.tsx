import { store } from "@/services/redux/redux";
import { Stack } from "expo-router";
import "react-native-reanimated";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="add" />
      </Stack>
    </Provider>
  );
}
