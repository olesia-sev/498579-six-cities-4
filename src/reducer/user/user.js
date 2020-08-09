import {AppRoute, extend} from "../../utils/utils";
import {history} from "../../history";

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

export const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  authInfo: null,
};

const ActionType = {
  SET_AUTH_STATUS: `SET_AUTH_STATUS`,
  SET_AUTH_INFO: `SET_AUTH_INFO`,
};

const ActionCreator = {
  setAuthInfo: (info) => ({
    type: ActionType.SET_AUTH_INFO,
    payload: info,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_AUTH_INFO:
      if (action.payload) {
        return extend(state, {
          authorizationStatus: AuthorizationStatus.AUTH,
          authInfo: action.payload,
        });
      }
      return extend(state, {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        authInfo: null,
      });
  }
  return state;
};

const Operation = {
  checkAuthStatus: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        dispatch(ActionCreator.setAuthInfo(response.data));
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(`[AUTH ERROR]`, error.message);
      });
  },
  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, authData)
      .then((response) => {
        dispatch(ActionCreator.setAuthInfo(response.data));
        history.push(AppRoute.ROOT);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(`[LOGIN ERROR]`, error.message);
      });
  },
};

export {AuthorizationStatus, ActionType, ActionCreator, reducer, Operation};
