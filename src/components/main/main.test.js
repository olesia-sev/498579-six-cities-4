import React from "react";
import Main from "./main";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {cardDataArray, citiesArray} from "../../utils/test.utils";
import {BrowserRouter as Router} from "react-router-dom";
import {NameSpace} from "../../reducer/name-space";

const mockStore = configureStore([]);

it(`Main should be rendered`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      activeCityId: `Amsterdam`,
      cities: citiesArray,
      offers: cardDataArray,
    },
    [NameSpace.USER]: {
      authorizationStatus: `NO_AUTH`,
      authInfo: null,
    }
  });

  const tree = renderer
    .create(<Router>
      <Provider store={store}>
        <Main />
      </Provider>
    </Router>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
