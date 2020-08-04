import {ActionType, ActionCreator} from './app';

describe(`Action creators work correctly`, () => {
  it(`Action creator sortOffers returns correct action`, () => {
    expect(ActionCreator.sortOffers(`Popular`)).toEqual({
      type: ActionType.SORT_OFFERS,
      payload: `Popular`,
    });
  });

  it(`Action creator toggleSorting returns correct action`, () => {
    expect(ActionCreator.toggleSorting({
      isOpened: true
    })).toEqual({
      type: ActionType.TOGGLE_SORTING_LIST,
      payload: false,
    });
  });

  it(`Action creator getHoveredOffer returns correct action`, () => {
    expect(ActionCreator.getHoveredOffer({
      id: 10,
      cityId: 100,
      coords: [52.3909553943508, 4.85309666406198],
      img: `https://placedog.net/260/200?id=2`,
      images: [`https://placedog.net/260/200?id=3`],
      price: 150,
      title: `Title`,
      placeType: `Flat`,
      numberOfBedrooms: 2,
      maxGuests: 3,
      rating: 4,
      saved: true,
      premium: true,
      featuresInside: [`Wi-Fi`, `Heating`],
      hostName: `Pete`,
      hostAvatar: `https://placedog.net/260/200?id=5`,
      userPro: true,
      description: `Description`,
      reviews: [],
    })).toEqual({
      type: ActionType.GET_HOVERED_OFFER,
      payload: {
        id: 10,
        cityId: 100,
        coords: [52.3909553943508, 4.85309666406198],
        img: `https://placedog.net/260/200?id=2`,
        images: [`https://placedog.net/260/200?id=3`],
        price: 150,
        title: `Title`,
        placeType: `Flat`,
        numberOfBedrooms: 2,
        maxGuests: 3,
        rating: 4,
        saved: true,
        premium: true,
        featuresInside: [`Wi-Fi`, `Heating`],
        hostName: `Pete`,
        hostAvatar: `https://placedog.net/260/200?id=5`,
        userPro: true,
        description: `Description`,
        reviews: [],
      }
    });
  });
});
