import { Place } from "@/models/place";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { fetchPlaces } from "../../util/database";
import PlacesList from "../components/Places/PlacesList";

export default function AllPlaces({ route }: { route: any }) {
  const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlaces();
      setLoadedPlaces(places);
    }

    if (isFocused) {
      loadPlaces();
      // const place = route.params.place;
      // setLoadedPlaces((curPlaces) => [...curPlaces, place]);
    }
  }, [isFocused]);

  return <PlacesList places={loadedPlaces} />;
}
