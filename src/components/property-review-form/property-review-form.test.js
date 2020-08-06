import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter as Router} from "react-router-dom";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import PropertyReviewForm from "./property-review-form";

const mockStore = configureStore([]);

it(`PropertyReviewForm should be rendered`, () => {
  const store = mockStore({});

  const tree = renderer
    .create(<Router>
      <Provider store={store}>
        <PropertyReviewForm />
      </Provider>
    </Router>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
