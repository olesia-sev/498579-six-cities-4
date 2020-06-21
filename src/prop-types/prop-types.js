import PropTypes from 'prop-types';

export const offerType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  placeType: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  saved: PropTypes.bool.isRequired,
  premium: PropTypes.bool.isRequired,
}).isRequired;

export const offersTypeArray = PropTypes.arrayOf(offerType).isRequired;
