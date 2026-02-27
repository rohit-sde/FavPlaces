import { Place } from "@/models/place";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";

export default function AllPlaces({ route }: { route: any }) {
  const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      const place = route.params.place;
      setLoadedPlaces((curPlaces) => [...curPlaces, place]);
    }
  }, [isFocused, route]);

  return <PlacesList places={loadedPlaces} />;
}
