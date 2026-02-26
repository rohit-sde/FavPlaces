import { useCameraPermissions } from "expo-camera";
import { launchCameraAsync } from "expo-image-picker";
import { Button, Text, View } from "react-native";

export default function ImagePicker() {
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  async function takeImageHandler() {
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    console.log(image);
  }

  return (
    <View>
      <View>
        <Text>No Image Taken Yet</Text>
      </View>
      <Button title="Take Image" onPress={takeImageHandler} />
    </View>
  );
}
