import React from "react";
import {act, create} from "react-test-renderer";
import {BrowserRouter as Router} from "react-router-dom";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {PropertyReviewSection} from "./property-review-section";
import {authStatus, reviews} from "../../utils/test.utils";
import {NameSpace} from "../../reducer/name-space";
import thunk from "redux-thunk";
import {Operation} from "../../reducer/data/data";

const mockStore = configureStore([thunk]);

it(`Property Review Section should be rendered`, async () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      reviews,
    },
  });

  const spy = jest.spyOn(Operation, `loadReviews`);
  spy.mockReturnValue(() => {
    return Promise.resolve();
  });

  let tree = create(null);

  await act(async () => {
    tree = create(
        <Router>
          <Provider store={store}>
            <PropertyReviewSection authStatus={authStatus} />
          </Provider>
        </Router>
    );
  });

  expect(tree.toJSON()).toMatchSnapshot();
});
