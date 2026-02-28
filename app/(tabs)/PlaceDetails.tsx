import { Colors } from "@/constants/colors";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Place } from "../../models/place";
import { fetchPlaceDetails } from "../../util/database";
import OutlinedButton from "../components/UI/OutlinedButton";

export default function PlaceDetails({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const [fetchedPlace, setFetchedPlace] = useState<Place>();

  function showOnMapHandler() {
    navigation.navigate("Map", {
      initialLat: fetchedPlace?.location.lat,
      initialLng: fetchedPlace?.location.lng,
    });
  }

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    async function loadPlace() {
      const place = await fetchPlaceDetails(selectedPlaceId);
      setFetchedPlace(place);
      console.log(place);
      navigation.setOptions({
        title: place.title,
      });
    }

    loadPlace();
  }, [selectedPlaceId]);

  if (!fetchedPlace) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>Loading place...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: fetchedPlace?.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace?.address}</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
