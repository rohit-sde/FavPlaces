import { Place } from "@/models/place";
import { insertPlace } from "../../util/database";
import PlaceForm from "../components/Places/PlaceForm";

export default function AddPlace({ navigation }: { navigation: any }) {
  async function createPlaceHandler(placeData: Place) {
    await insertPlace(placeData);
    navigation.navigate("AllPlaces");
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}
