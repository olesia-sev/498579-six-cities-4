import {createSelector} from "reselect";
import {NameSpace} from "../name-space.js";

export const getOffers = (state) => {
  return state[NameSpace.DATA].offers;
};

export const getCurrentOffer = (state, offerId) => {
  return getOffers(state).find((offer) => offer.id === +offerId);
};

export const getCurrentOfferId = (state) => {
  return getOffers(state).find((offer) => offer.id);
};

export const getActiveCityId = (state) => {
  return state[NameSpace.DATA].activeCityId;
};

export const getCities = (state) => {
  return state[NameSpace.DATA].cities;
};

export const getCitiesCoords = createSelector(
    getOffers,
    getActiveCityId,
    (offers, activeCityId) => {
      return offers.find((offer) => offer.cityLocation === activeCityId);
    }
);

export const getActiveCity = createSelector(
    getCities,
    getActiveCityId,
    (cities, activeCityId) => {
      return cities.find((city) => city.id === activeCityId);
    }
);

export const getFilteredOffers = createSelector(
    getOffers,
    getActiveCityId,
    (offers, activeCityId) => {
      return offers.filter((offer) => offer.cityId === activeCityId);
    }
);

export const getReviews = (state) => {
  return state[NameSpace.DATA].reviews;
};

export const getFavourites = (state) => {
  return state[NameSpace.DATA].favourites;
};

export const getFavouritesLocations = createSelector(
    getFavourites,
    (result) => {
      return Array.from(new Set(result.map((it) => it.cityId)));
    }
);

export const offersNearbySelector = (state) => {
  return state[NameSpace.DATA].offersNearby;
};
