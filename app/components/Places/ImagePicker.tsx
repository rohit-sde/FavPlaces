import { Colors } from "@/constants/colors";
import { useCameraPermissions } from "expo-camera";
import { launchCameraAsync } from "expo-image-picker";
// import { PermissionStatus } from "expo-permissions";
import { useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";

export default function ImagePicker({
  onTakeImage,
}: {
  onTakeImage: (imageUri: string) => void;
}) {
  const [image, setImage] = useState<string | null>(null);
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  async function verifyPermission() {
    console.log(cameraPermissionInformation);
    if (
      cameraPermissionInformation?.status === "undetermined" ||
      cameraPermissionInformation?.status === "denied"
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    // this is done due to my default permission is coming as denied

    // if (cameraPermissionInformation?.status === "denied") {
    //   Alert.alert(
    //     "Insufficient permissions!",
    //     "You need to grant camera permissions to use this app.",
    //   );
    //   return false;
    // }

    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }
    const { assets } = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setImage(assets![0]!.uri);
    onTakeImage(assets![0]!.uri);
  }

  let imagePreview = <Text>No Image Taken Yet</Text>;

  if (image) {
    imagePreview = <Image source={{ uri: image }} style={styles.image} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <Button title="Take Image" onPress={takeImageHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
