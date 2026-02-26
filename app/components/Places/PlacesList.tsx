import { FlatList, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../constants/colors";
import { Place } from "../../../models/place";
import PlaceItem from "./PlaceItem";

export default function PlacesList({ places }: { places: Place[] }) {
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>No places added yet.</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlaceItem place={item} onSelect={() => {}} />}
    />
  );
}

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
