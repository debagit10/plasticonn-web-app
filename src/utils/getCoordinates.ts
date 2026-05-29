const getCoordinates = async (address: string) => {
  const simplifyAddress = (address: string) => {
    return address
      .replace(/^\d+\s*/, "") // remove house number
      .split(",")
      .slice(-3) // keep last parts (area, city, country)
      .join(",")
      .trim();
  };

  try {
    const query = simplifyAddress(address);

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`,
    );

    const data = await response.json();

    if (data?.length) {
      return {
        lat: Number(data[0].lat),
        lng: Number(data[0].lon),
      };
    }

    return null;
  } catch (err) {
    console.error("Geocoding failed:", err);
    return null;
  }
};

export default getCoordinates;
