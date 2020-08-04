import PropTypes from 'prop-types';

export const reviewType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  userName: PropTypes.string.isRequired,
  userAvatar: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
}).isRequired;

export const reviewTypeArray = PropTypes.arrayOf(reviewType).isRequired;

export const offerType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  coords: PropTypes.arrayOf(PropTypes.number).isRequired,
  cityId: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  placeType: PropTypes.string.isRequired,
  numberOfBedrooms: PropTypes.number.isRequired,
  maxGuests: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  saved: PropTypes.bool.isRequired,
  premium: PropTypes.bool.isRequired,
  featuresInside: PropTypes.array.isRequired,
  hostName: PropTypes.string.isRequired,
  hostAvatar: PropTypes.string.isRequired,
  userPro: PropTypes.bool.isRequired,
  description: PropTypes.string.isRequired,
  reviews: reviewTypeArray,
});

export const offersTypeArray = PropTypes.arrayOf(offerType).isRequired;

export const cityType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
});

export const citiesTypeArray = PropTypes.arrayOf(cityType);
