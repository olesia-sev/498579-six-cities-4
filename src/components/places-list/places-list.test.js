import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import PlacesList from "./places-list";
import {cardDataArray, theme} from "../../utils/test.utils";
import {BrowserRouter as Router} from "react-router-dom";

const mockStore = configureStore([]);

it(`Places list should be rendered`, () => {
  const store = mockStore({
    offers: cardDataArray,
  });

  const tree = renderer
    .create(<Router>
      <Provider store={store}>
        <PlacesList theme={theme} />
      </Provider>
    </Router>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
