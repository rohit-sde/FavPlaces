import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppLoading from "expo-app-loading";
import { useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import IconButton from "../components/UI/IconButton";
import { init } from "../util/database";
import AddPlace from "./AddPlace";
import AllPlaces from "./AllPlaces";
import Map from "./Map";

export default function HomeScreen() {
  const [dbIsInitialized, setDbIsInitialized] = useState(false);

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    init()
      .then(() => setDbIsInitialized(true))
      .catch((error) => {
        console.log(error);
        Alert.alert("Initializing database failed!", "Please try again later.");
      });
  }, []);

  if (!dbIsInitialized) {
    return <AppLoading />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: Colors.gray700,
        contentStyle: { backgroundColor: Colors.gray700 },
      }}
    >
      <Stack.Screen
        name="AllPlaces"
        component={AllPlaces}
        options={({ navigation }) => ({
          title: "All Places",
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="add"
              size={24}
              color={tintColor!}
              onPress={() => navigation.navigate("AddPlace")}
            />
          ),
        })}
      />
      <Stack.Screen name="AddPlace" component={AddPlace} />
      <Stack.Screen name="Map" component={Map} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
