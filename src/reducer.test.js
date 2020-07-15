import {reducer, ActionType, ActionCreator, initialState} from "./reducer";

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
