import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Map from "./map";
import {cardDataArray} from "../../utils/test.utils";

const mockStore = configureStore([]);

it(`Map container should be rendered`, () => {
  const store = mockStore({
    offers: cardDataArray,
  });

  const tree = renderer
    .create(<Router>
      <Provider store={store}>
        <Map/>
      </Provider>
    </Router>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
