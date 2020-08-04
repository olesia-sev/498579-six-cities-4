import {NameSpace} from "../name-space.js";
import {createSelector} from "reselect";
import {AuthorizationStatus} from "./user";

export const getAuthStatus = (state) => {
  return state[NameSpace.USER].authorizationStatus;
};

export const isUserAuthorizedSelector = createSelector(
    getAuthStatus,
    (authStatus) => authStatus === AuthorizationStatus.AUTH
);

export const getAuthInfo = (state) => {
  return state[NameSpace.USER].authInfo;
};
