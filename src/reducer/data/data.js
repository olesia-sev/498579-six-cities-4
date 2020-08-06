import {extend, MAX_REVIEWS_LENGTH} from "../../utils/functions";
import {createOffers} from "../../adapters/offers";
import {createCity} from "../../adapters/cities";
import {mapReviews} from "../../adapters/reviews";

export const initialState = {
  activeCityId: undefined,
  offers: [],
  cities: [],
  reviews: [],
};

const ActionType = {
  SET_ACTIVE_CITY: `SET_ACTIVE_CITY`,
  LOAD_OFFERS: `LOAD_OFFERS`,
  SET_CITIES: `SET_CITIES`,
  SET_REVIEWS: `SET_REVIEWS`,
};

const ActionCreator = {
  setActiveCity: (id) => ({
    type: ActionType.SET_ACTIVE_CITY,
    payload: id,
  }),
  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: offers,
  }),
  setCities: (cities) => ({
    type: ActionType.SET_CITIES,
    payload: cities,
  }),
  setReviews: (reviews) => ({
    type: ActionType.SET_REVIEWS,
    payload: reviews,
  }),
};

const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        const loadedOffers = response.data.map((offer) => createOffers(offer));
        const cities = response.data.reduce((acc, offer) => {
          const city = createCity(offer);
          acc[city.id] = city;
          return acc;
        }, {});
        dispatch(ActionCreator.setActiveCity(loadedOffers[0].cityId));
        dispatch(ActionCreator.loadOffers(loadedOffers));
        dispatch(ActionCreator.setCities(Object.values(cities)));
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(`[HOTELS ERROR]`, error.message);
      });
  },
  loadReviews: (offerId) => (dispatch, getState, api) => {
    return api.get(`/comments/${offerId}`)
      .then((response) => {
        dispatch(
            ActionCreator.setReviews(
                response.data
                  .slice(Math.max(response.data.length - MAX_REVIEWS_LENGTH, 0))
                  .map(mapReviews)
            )
        );
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(`[COMMENTS ERROR]`, error.message);
      });
  },
  postReview: (offerId, review) => (dispatch, getState, api) => {
    return api.post(`/comments/${offerId}`, review);
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_ACTIVE_CITY:
      return extend(state, {
        activeCityId: action.payload,
      });
    case ActionType.LOAD_OFFERS:
      return extend(state, {
        offers: action.payload
      });
    case ActionType.SET_CITIES:
      return extend(state, {
        cities: action.payload,
      });
    case ActionType.SET_REVIEWS:
      return extend(state, {
        reviews: action.payload,
      });
  }
  return state;
};

export {Operation, reducer, ActionType, ActionCreator};
