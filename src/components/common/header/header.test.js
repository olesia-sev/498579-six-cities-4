import React from "react";
import renderer from "react-test-renderer";
import Header from "./header";
import configureStore from "redux-mock-store";
import {NameSpace} from "../../../reducer/name-space";
import {Provider} from "react-redux";

const mockStore = configureStore([]);

it(`Header should be rendered`, () => {
  const store = mockStore({
    [NameSpace.USER]: {
      authorizationStatus: `NO_AUTH`,
      authInfo: null,
    },
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <Header />
        </Provider>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
