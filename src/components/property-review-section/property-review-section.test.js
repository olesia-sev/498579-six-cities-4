import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter as Router} from "react-router-dom";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {PropertyReviewSection} from "./property-review-section";
import {authStatus, reviews} from "../../utils/test.utils";
import {NameSpace} from "../../reducer/name-space";

const mockStore = configureStore([]);

it(`Property Review Section should be rendered`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      reviews,
    },
  });

  const tree = renderer
    .create(<Router>
      <Provider store={store}>
        <PropertyReviewSection authStatus={authStatus} />
      </Provider>
    </Router>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
