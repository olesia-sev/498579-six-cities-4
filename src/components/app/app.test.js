import React from "react";
import {App} from "./app";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import {citiesArray, cardDataArray} from "../../utils/test.utils";

const mockStore = configureStore([]);

it(`App should be rendered`, () => {
  const store = mockStore({
    activeCityId: 10,
    cities: citiesArray,
    offers: cardDataArray,
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
