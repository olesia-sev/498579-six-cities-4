export const createOffers = (offer) => {
  return (
    {
      id: offer.id,
      cityId: offer.city.name,
      coords: [offer.location.latitude, offer.location.longitude],
      img: offer.preview_image,
      images: offer.images,
      price: offer.price,
      title: offer.title,
      placeType: offer.type,
      numberOfBedrooms: offer.bedrooms,
      maxGuests: offer.max_adults,
      rating: offer.rating,
      saved: offer.is_favorite,
      premium: offer.is_premium,
      featuresInside: offer.goods,
      hostName: offer.host.name,
      hostAvatar: offer.host.avatar_url,
      userPro: offer.host.is_pro,
      description: offer.description,
    }
  );
};
