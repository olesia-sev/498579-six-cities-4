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
      reviews: [
        {
          id: 12,
          userName: `Max`,
          userAvatar: `/img/avatar-max.jpg`,
          rating: 4,
          content: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
          date: `April 2019`
        },
      ],
    }
  );
};
