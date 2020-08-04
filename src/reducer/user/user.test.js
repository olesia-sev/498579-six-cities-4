import {initialState, reducer} from "./user";
import {ActionCreator, ActionType} from "./user";

describe(`Reducer tests`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual(initialState);
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator setAuthInfo returns correct action`, () => {
    expect(ActionCreator.setAuthInfo({fake: true})).toEqual({
      type: ActionType.SET_AUTH_INFO,
      payload: {fake: true},
    });
  });
});
