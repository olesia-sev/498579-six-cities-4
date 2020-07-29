import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {reducer, ActionType, ActionCreator, initialState, Operation} from './data';
import {createCity} from "../../adapters/cities";

const api = createAPI(() => {});

const offersRaw = [{
  bedrooms: 5,
  city: {name: `Amsterdam`, location: {latitude: 52.37454, longitude: 4.897976, zoom: 13}},
  description: `I rent out a very sunny and bright apartment only 7 minutes walking distance to the metro station. The apartment has a spacious living room with a kitchen, one bedroom and a bathroom with mit bath. A terrace can be used in summer.`,
  goods: [`Laptop friendly workspace`],
  host: {id: 25, name: `Angelina`, [`is_pro`]: true, [`avatar_url`]: `img/avatar-angelina.jpg`},
  id: 1,
  images: [`https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/6.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/10.jpg`],
  [`is_favorite`]: false,
  [`is_premium`]: false,
  location: {latitude: 52.385540000000006, longitude: 4.886976, zoom: 16},
  [`max_adults`]: 6,
  [`preview_image`]: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/15.jpg`,
  price: 813,
  rating: 2,
  title: `Wood and stone place`,
  type: `house`,
}];

const offersResult = [
  {
    cityId: `Amsterdam`,
    coords: [
      52.385540000000006,
      4.886976
    ],
    description: `I rent out a very sunny and bright apartment only 7 minutes walking distance to the metro station. The apartment has a spacious living room with a kitchen, one bedroom and a bathroom with mit bath. A terrace can be used in summer.`,
    featuresInside: [
      `Laptop friendly workspace`
    ],
    hostAvatar: `img/avatar-angelina.jpg`,
    hostName: `Angelina`,
    id: 1,
    images: [
      `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/6.jpg`,
      `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/10.jpg`
    ],
    img: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/15.jpg`,
    maxGuests: 6,
    numberOfBedrooms: 5,
    placeType: `house`,
    premium: false,
    price: 813,
    rating: 2,
    reviews: [
      {
        content: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
        date: `April 2019`,
        id: 12,
        rating: 4,
        userAvatar: `/img/avatar-max.jpg`,
        userName: `Max`
      }
    ],
    saved: false,
    title: `Wood and stone place`,
    userPro: true
  }
];

describe(`Reducer tests`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual(initialState);
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator setActiveCity returns correct action`, () => {
    expect(ActionCreator.setActiveCity(20)).toEqual({
      type: ActionType.SET_ACTIVE_CITY,
      payload: 20,
    });
  });
});

describe(`Operation works correctly`, () => {
  it(`Should make a correct API call to /hotels`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offersLoader = Operation.loadOffers();

    const cities = offersRaw.reduce((acc, offer) => {
      const city = createCity(offer);
      acc[city.id] = city;
      return acc;
    }, {});

    apiMock
      .onGet(`/hotels`)
      .reply(200, [...offersRaw]);

    return offersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch.mock.calls.length).toBe(3);

        expect(dispatch.mock.calls[0][0]).toEqual({
          type: ActionType.SET_ACTIVE_CITY,
          payload: offersResult[0].cityId,
        });

        expect(dispatch.mock.calls[1][0]).toEqual({
          type: ActionType.LOAD_OFFERS,
          payload: [...offersResult],
        });

        expect(dispatch.mock.calls[2][0]).toEqual({
          type: ActionType.SET_CITIES,
          payload: Object.values(cities),
        });
      });
  });
});
