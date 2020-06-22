import {getRandomNumberInRange} from '../utils/functions';

export default [
  {
    id: 1,
    img: `https://placedog.net/260/200?id=${getRandomNumberInRange(1, 100)}`,
    price: 50,
    title: `Nice, cozy, warm big bed apartment`,
    placeType: `Apartment`,
    rating: 5,
    saved: true,
    premium: true,
  },
  {
    id: 2,
    img: `https://placedog.net/260/200?id=${getRandomNumberInRange(1, 100)}`,
    price: 80,
    title: `Wood and stone place`,
    placeType: `Private room`,
    rating: 2,
    saved: false,
    premium: false,
  },
  {
    id: 3,
    img: `https://placedog.net/260/200?id=${getRandomNumberInRange(1, 100)}`,
    price: 120,
    title: `Wood place`,
    placeType: `Apartment`,
    rating: 3,
    saved: false,
    premium: true,
  },
  {
    id: 4,
    img: `https://placedog.net/260/200?id=${getRandomNumberInRange(1, 100)}`,
    price: 200,
    title: `Nice flat`,
    placeType: `Apartment`,
    rating: 4,
    saved: true,
    premium: true,
  },
];
