import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import IconButton from "../components/UI/IconButton";
import AddPlace from "./AddPlace";
import AllPlaces from "./AllPlaces";

export default function HomeScreen() {
  const Stack = createNativeStackNavigator();

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
