import { Place } from "@/models/place";
import PlaceForm from "../components/Places/PlaceForm";

export default function AddPlace({ navigation }: { navigation: any }) {
  function createPlaceHandler(placeData: Place) {
    navigation.navigate("AllPlaces", {
      place: placeData,
    });
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}
