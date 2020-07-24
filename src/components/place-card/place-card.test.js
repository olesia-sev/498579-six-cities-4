import React from "react";
import PlaceCard from "./place-card";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {cardDataArray, theme} from "../../utils/test.utils";
import {BrowserRouter as Router} from "react-router-dom";

const mockStore = configureStore([]);

it(`PlaceCard should be rendered`, () => {
  const store = mockStore({
    offers: cardDataArray,
  });

  const tree = renderer
    .create(
        <Router>
          <Provider store={store}>
            <PlaceCard
              theme={theme}
              offer={cardDataArray[0]}
            />
          </Provider>
        </Router>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
