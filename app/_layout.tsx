import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import HomeScreen from "./(tabs)";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <HomeScreen />
    </>
  );
}
