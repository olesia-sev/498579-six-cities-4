import React from "react";
import {act, create} from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {cardDataArray} from "../../utils/test.utils";
import {NameSpace} from "../../reducer/name-space";
import Favourites from "./favourites";
import {BrowserRouter as Router} from "react-router-dom";
import {Operation} from "../../reducer/data/data";
import thunk from "redux-thunk";

const mockStore = configureStore([thunk]);

it(`Favourites should be rendered`, async () => {

  const store = mockStore({
    [NameSpace.DATA]: {
      activeCityId: `Amsterdam`,
      offers: cardDataArray,
      favourites: cardDataArray,
    },
    [NameSpace.USER]: {
      authorizationStatus: `AUTH`,
      authInfo: {fake: true},
    }
  });

  const spy = jest.spyOn(Operation, `loadFavourites`);
  spy.mockReturnValue(() => {
    return Promise.resolve();
  });

  let tree = create(null);
  await act(async () => {
    tree = create(
        <Router>
          <Provider store={store}>
            <Favourites />
          </Provider>
        </Router>
    );
  });

  expect(tree.toJSON()).toMatchSnapshot();
});
