import React from "react";
import {App} from "./app";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {act, create} from "react-test-renderer";
import {citiesArray, cardDataArray} from "../../utils/test.utils";
import {NameSpace} from "../../reducer/name-space";
import thunk from "redux-thunk";
import {Operation as UserOperation} from "../../reducer/user/user";
import {Operation as DataOperation} from "../../reducer/data/data";

const mockStore = configureStore([thunk]);

it(`App should be rendered`, async () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      activeCityId: `Amsterdam`,
      cities: citiesArray,
      offers: cardDataArray,
    },
    [NameSpace.USER]: {
      authorizationStatus: `NO_AUTH`,
      authInfo: {fake: true},
    }
  });

  const spyOnCheckAuthStatus = jest.spyOn(UserOperation, `checkAuthStatus`);
  spyOnCheckAuthStatus.mockReturnValue(() => {
    return Promise.resolve();
  });

  const spyOnLoadOffers = jest.spyOn(DataOperation, `loadOffers`);
  spyOnLoadOffers.mockReturnValue(() => {
    return Promise.resolve();
  });

  let tree = create(null);
  await act(async () => {
    tree = create(
        <Provider store={store}>
          <App />
        </Provider>
    );
  });

  expect(tree.toJSON()).toMatchSnapshot();
});
