import React from "react";
import SignIn from "./sign-in";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import {NameSpace} from "../../reducer/name-space";
import {BrowserRouter as Router} from "react-router-dom";

const mockStore = configureStore([]);

it(`SignIn should be rendered`, () => {
  const store = mockStore({
    [NameSpace.USER]: {
      authorizationStatus: `NO_AUTH`,
      authInfo: null,
    }
  });

  const tree = renderer
    .create(
        <Router>
          <Provider store={store}>
            <SignIn />
          </Provider>
        </Router>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
