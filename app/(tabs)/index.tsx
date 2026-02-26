import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import IconButton from "../components/UI/IconButton";
import AddPlace from "./AddPlace";
import AllPlaces from "./AllPlaces";

export default function HomeScreen() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AllPlaces"
        component={AllPlaces}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="add"
              size={24}
              color={tintColor!}
              onPress={() => {}}
            />
          ),
        }}
      />
      <Stack.Screen name="AddPlace" component={AddPlace} />
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
