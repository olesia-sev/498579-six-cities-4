export const createCity = (offer) => {
  return {
    id: offer.city.name,
    name: offer.city.name,
    location: {
      latitude: offer.city.location.latitude,
      longitude: offer.city.location.longitude,
      zoom: offer.city.location.zoom,
    }
  };
};
