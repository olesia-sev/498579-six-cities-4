import {MAIN_THEME} from "../components/places-list/places-list";
import {PLACE_CARD_FAV_BTN} from "../components/common/favourite-button/favourite-button";
import {PLACE_CARD_THEME} from "../components/common/ratinig/ratinig";

export const optionsAmount = 100;

export const testString = `Test string`;

export const emptyFunction = () => {};

export const cardId = 12;

export const theme = MAIN_THEME;
export const favButtonTheme = PLACE_CARD_FAV_BTN;
export const ratingTheme = PLACE_CARD_THEME;

export const cardDataArray = [
  {
    id: 10,
    cityId: 100,
    city: `Paris`,
    coords: [52.3909553943508, 4.85309666406198],
    img: `https://placedog.net/260/200?id=2`,
    images: [
      `https://placedog.net/260/200?id=3`,
      `https://placedog.net/260/200?id=33`,
      `https://placedog.net/260/200?id=12`,
      `https://placedog.net/260/200?id=10`,
      `https://placedog.net/260/200?id=11`,
      `https://placedog.net/260/200?id=15`,
    ],
    price: 150,
    title: `Title`,
    placeType: `Flat`,
    numberOfBedrooms: 2,
    maxGuests: 3,
    rating: 4,
    saved: true,
    premium: true,
    featuresInside: [
      `Wi-Fi`, `Heating`,
    ],
    hostName: `Pete`,
    hostAvatar: `https://placedog.net/260/200?id=5`,
    userPro: true,
    description: `Description`,
    reviews: [
      {
        id: 95,
        userName: `Mini`,
        userAvatar: `https://placedog.net/260/200?id=5`,
        rating: 4,
        content: `Review`,
        date: `April 2019`
      },
    ],
  },
  {
    id: 100,
    cityId: 200,
    city: `Cologne`,
    coords: [52.369553943508, 4.85309666406198],
    img: `https://placedog.net/260/200?id=3`,
    images: [
      `https://placedog.net/260/200?id=33`,
      `https://placedog.net/260/200?id=99`,
      `https://placedog.net/260/200?id=89`,
      `https://placedog.net/260/200?id=29`,
      `https://placedog.net/260/200?id=13`,
      `https://placedog.net/260/200?id=16`,
    ],
    price: 150,
    title: `Title test`,
    placeType: `Flat`,
    numberOfBedrooms: 1,
    maxGuests: 2,
    rating: 4,
    saved: false,
    premium: false,
    featuresInside: [
      `Wi-Fi`, `Heating`,
    ],
    hostName: `Pete`,
    hostAvatar: `https://placedog.net/260/200?id=57`,
    userPro: false,
    description: `Description`,
    reviews: [
      {
        id: 92,
        userName: `Max`,
        userAvatar: `/img/avatar-max.jpg`,
        rating: 4,
        content: `Review`,
        date: `April 2019`
      },
      {
        id: 93,
        userName: `Tom`,
        userAvatar: `/img/avatar.svg`,
        rating: 5,
        content: `Review`,
        date: `May 2019`
      },
    ],
  }
];

export const citiesArray = [
  {
    name: `Paris`,
    id: 100,
  },
  {
    name: `Cologne`,
    id: 200,
  },
  {
    name: `Brussels`,
    id: 300,
  },
  {
    name: `Amsterdam`,
    id: 400,
  },
  {
    name: `Hamburg`,
    id: 500,
  },
  {
    name: `Dusseldorf`,
    id: 600,
  }
];
