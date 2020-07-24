import React from "react";
import Sorting from "./sorting";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

it(`Sorting should be rendered`, () => {
  const store = mockStore({
    activeSortingType: `popular`,
    isSortingListOpened: false,
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <Sorting />
        </Provider>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
