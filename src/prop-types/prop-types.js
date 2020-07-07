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
  img: PropTypes.string.isRequired,
  images: PropTypes.array,
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  placeType: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  saved: PropTypes.bool.isRequired,
  premium: PropTypes.bool.isRequired,
  reviews: reviewTypeArray,
}).isRequired;

export const offersTypeArray = PropTypes.arrayOf(offerType).isRequired;
