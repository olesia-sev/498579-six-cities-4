import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import CitiesList from "./cities-list";
import {cardDataArray, citiesArray} from "../../utils/test.utils";
import {NameSpace} from "../../reducer/name-space";

const mockStore = configureStore([]);

it(`CitiesList should be rendered`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      activeCityId: `Amsterdam`,
      cities: citiesArray,
      offers: cardDataArray,
    },
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <CitiesList />)
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
