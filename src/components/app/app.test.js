import React from "react";
import {App} from "./app";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import {citiesArray, cardDataArray} from "../../utils/test.utils";
import {NameSpace} from "../../reducer/name-space";

const mockStore = configureStore([]);

it(`App should be rendered`, () => {
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
          <App />
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
