import { getDistance } from "geolib";
import { useAuth } from "./useAuth";

export const useDistance = (targetLat: number, targetLng: number) => {
  const { coords } = useAuth();

  console.log(coords);

  if (!coords?.lat || !coords?.lng || targetLat == null || targetLng == null) {
    return null;
  }

  const distance = getDistance(
    {
      latitude: Number(coords?.lat),
      longitude: Number(coords?.lng),
    },
    {
      latitude: targetLat,
      longitude: targetLng,
    },
  );

  return (distance / 1000).toFixed(1);
};
