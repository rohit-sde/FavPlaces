import { Colors } from "@/constants/colors";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
} from "expo-location";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import getMapPreview from "../../util/location";
import OutlinedButton from "../UI/OutlinedButton";

export default function LocationPicker() {
  const [pickedLocation, setPickedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [locationPermission, requestPermission] = useForegroundPermissions();
  const navigation = useNavigation();

  async function verifyPermissions() {
    if (locationPermission?.status === "undetermined") {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (locationPermission?.status === "denied") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant location permissions to use this app.",
      );
      return false;
    }

    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    console.log(location);
    setPickedLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  }

  function pickLocationHandler() {
    navigation.navigate("Map");
  }

  let locatonPreview = <Text>No location picked yet.</Text>;

  if (pickedLocation) {
    locatonPreview = (
      <Image
        source={{
          uri: getMapPreview(
            pickedLocation?.latitude,
            pickedLocation?.longitude,
          ),
        }}
        style={styles.image}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locatonPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton onPress={getLocationHandler} icon="location">
          Locate User
        </OutlinedButton>
        <OutlinedButton onPress={pickLocationHandler} icon="map">
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
