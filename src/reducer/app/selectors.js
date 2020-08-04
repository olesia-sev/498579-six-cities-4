import {NameSpace} from "../name-space.js";

export const getHoveredOffer = (state) => {
  return state[NameSpace.APP].hoveredOffer;
};

export const getActiveSortingType = (state) => {
  return state[NameSpace.APP].activeSortingType;
};

export const getSortingListState = (state) => {
  return state[NameSpace.APP].isSortingListOpened;
};
