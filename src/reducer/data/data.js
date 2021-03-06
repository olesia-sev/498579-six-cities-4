import {AppRoute, extend, MAX_REVIEWS_LENGTH} from "../../utils/utils";
import {createOffers} from "../../adapters/offers";
import {createCity} from "../../adapters/cities";
import {mapReviews} from "../../adapters/reviews";
import {history} from "../../history";

export const initialState = {
  activeCityId: undefined,
  offers: [],
  cities: [],
  reviews: [],
  favourites: [],
  offersNearby: [],
};

const ActionType = {
  SET_ACTIVE_CITY: `SET_ACTIVE_CITY`,
  LOAD_OFFERS: `LOAD_OFFERS`,
  SET_CITIES: `SET_CITIES`,
  SET_REVIEWS: `SET_REVIEWS`,
  UPDATE_FAVOURITES: `UPDATE_FAVOURITES`,
  SET_FAVOURITES: `SET_FAVOURITES`,
  GET_OFFERS_NEARBY: `GET_OFFERS_NEARBY`,
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
  updateFavourites: (favourites) => ({
    type: ActionType.UPDATE_FAVOURITES,
    payload: favourites,
  }),
  setFavourites: (favourites) => ({
    type: ActionType.SET_FAVOURITES,
    payload: favourites,
  }),
  setOffersNearby: (offers) => ({
    type: ActionType.GET_OFFERS_NEARBY,
    payload: offers,
  }),
};

const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        const loadedOffers = response.data.map(createOffers);
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
        console.log(`[HOTELS ERROR]`, error.message);
      });
  },
  loadReviews: (offerId) => (dispatch, getState, api) => {
    return api.get(`/comments/${offerId}`)
      .then((response) => {
        dispatch(
            ActionCreator.setReviews(
                response.data
                  .slice(Math.max(response.data.length - MAX_REVIEWS_LENGTH, 0))
                  .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
                  .map(mapReviews)
            )
        );
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(`[COMMENTS ERROR]`, error.message);
      });
  },
  postReview: (offerId, review) => (dispatch, getState, api) => {
    return api.post(`/comments/${offerId}`, review);
  },
  postFavourite: (offerId, status) => (dispatch, getState, api) => {
    return api.post(`/favorite/${offerId}/${status}`)
      .then((response) => {
        dispatch(ActionCreator.updateFavourites([createOffers(response.data)]));
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(`[ERROR]`, error);
        if (error.response && error.response.status === 401) {
          history.push(AppRoute.LOGIN);
        }
      });
  },
  loadFavourites: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        const loadedFavourites = response.data.map(createOffers);
        dispatch(ActionCreator.updateFavourites(loadedFavourites));
        dispatch(ActionCreator.setFavourites(loadedFavourites));
      })
      .catch((error) => {
        history.push(AppRoute.LOGIN);
        // eslint-disable-next-line no-console
        console.log(`[FAVOURITES ERROR]`, error.message);
      });
  },
  getOffersNearby: (hotelId) => (dispatch, getState, api) => {
    return api.get(`/hotels/${hotelId}/nearby`)
      .then((response) => {
        const loadedOffersNearby = response.data.map(createOffers);
        dispatch(ActionCreator.setOffersNearby(loadedOffersNearby));
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(`[OFFERS NEARBY ERROR]`, error.message);
      });
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
    case ActionType.UPDATE_FAVOURITES:
      const offersToUpdateMap = action.payload.reduce((acc, offer) => {
        acc[offer.id] = offer;
        return acc;
      }, {});

      return extend(state, {
        offers: state.offers.map((offer) => {
          if (offersToUpdateMap[offer.id]) {
            return offersToUpdateMap[offer.id];
          }
          return offer;
        })
      });
    case ActionType.SET_FAVOURITES:
      return extend(state, {
        favourites: action.payload
      });
    case ActionType.GET_OFFERS_NEARBY:
      return extend(state, {
        offersNearby: action.payload
      });
  }
  return state;
};

export {Operation, reducer, ActionType, ActionCreator};
