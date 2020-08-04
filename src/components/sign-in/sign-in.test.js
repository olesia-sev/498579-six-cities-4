import React from "react";
import SignIn from "./sign-in";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import {NameSpace} from "../../reducer/name-space";

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
        <Provider store={store}>
          <SignIn />
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
