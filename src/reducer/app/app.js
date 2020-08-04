import {extend, SORT_TYPES} from "../../utils/functions";

export const initialState = {
  hoveredOffer: null,
  activeSortingType: SORT_TYPES.POPULAR,
  isSortingListOpened: false,
};

const ActionType = {
  SORT_OFFERS: `SORT_OFFERS`,
  TOGGLE_SORTING_LIST: `TOGGLE_SORTING_LIST`,
  GET_HOVERED_OFFER: `GET_HOVERED_OFFER`,
};

const ActionCreator = {
  sortOffers: (sortType) => ({
    type: ActionType.SORT_OFFERS,
    payload: sortType,
  }),
  toggleSorting: (isOpened) => ({
    type: ActionType.TOGGLE_SORTING_LIST,
    payload: !isOpened
  }),
  getHoveredOffer: (offer) => ({
    type: ActionType.GET_HOVERED_OFFER,
    payload: offer,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SORT_OFFERS:
      return extend(state, {
        activeSortingType: action.payload,
      });
    case ActionType.TOGGLE_SORTING_LIST:
      return extend(state, {
        isSortingListOpened: action.payload
      });
    case ActionType.GET_HOVERED_OFFER:
      return extend(state, {
        hoveredOffer: action.payload
      });

    default: {
      return state;
    }
  }
};

export {reducer, ActionType, ActionCreator};
