export const getRandomNumberInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const SORT_TYPES = {
  POPULAR: `Popular`,
  TO_HIGH_PRICE: `Price: low to high`,
  TO_LOW_PRICE: `Price: high to low`,
  TOP_RATED: `Top rated first`,
};

export const getSortedOffers = (offers, activeSort) => {
  switch (activeSort) {
    case SORT_TYPES.POPULAR:
      return offers.slice();
    case SORT_TYPES.TO_HIGH_PRICE:
      return offers.slice().sort((a, b) => a.price - b.price);
    case SORT_TYPES.TO_LOW_PRICE:
      return offers.slice().sort((a, b) => b.price - a.price);
    case SORT_TYPES.TOP_RATED:
      return offers.slice().sort((a, b) => b.rating - a.rating);
    default:
      return offers.slice();
  }
};
