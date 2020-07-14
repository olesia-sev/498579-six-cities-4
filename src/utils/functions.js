export const getRandomNumberInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};
