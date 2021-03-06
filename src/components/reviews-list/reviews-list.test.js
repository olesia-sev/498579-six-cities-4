import React from "react";
import renderer from "react-test-renderer";
import {ReviewsList} from "./reviews-list";
import {BrowserRouter as Router} from "react-router-dom";
import configureStore from "redux-mock-store";
import {NameSpace} from "../../reducer/name-space";
import {reviews} from "../../utils/test.utils";
import {Provider} from "react-redux";

const mockStore = configureStore([]);

it(`Reviews list should be rendered`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      reviews,
    },
  });

  const tree = renderer
    .create(<Router>
      <Provider store={store}>
        <ReviewsList reviews={reviews} />
      </Provider>
    </Router>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
