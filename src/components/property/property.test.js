import React from "react";
import {act, create} from "react-test-renderer";
import {MemoryRouter, Route} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Property from "./property";
import {cardDataArray, citiesArray, reviews} from "../../utils/test.utils";
import {NameSpace} from "../../reducer/name-space";
import {SORT_TYPES} from "../../utils/utils";
import {Operation} from "../../reducer/data/data";
import thunk from "redux-thunk";
import leaflet from "leaflet";

const mockStore = configureStore([thunk]);

it(`Property should be rendered`, async () => {
  const store = mockStore({
    [NameSpace.APP]: {
      hoveredOffer: null,
      activeSortingType: SORT_TYPES.POPULAR,
      isSortingListOpened: false,
    },
    [NameSpace.DATA]: {
      offers: cardDataArray,
      cities: citiesArray,
      activeCityId: citiesArray[0].id,
      reviews,
      offersNearby: [],
      favourites: [],
    },
    [NameSpace.USER]: {
      authorizationStatus: `NO_AUTH`,
      authInfo: null,
    }
  });

  const spyOnGetOffersNearby = jest.spyOn(Operation, `getOffersNearby`);
  spyOnGetOffersNearby.mockReturnValue(() => {
    return Promise.resolve();
  });

  const spyOnLoadReviews = jest.spyOn(Operation, `loadReviews`);
  spyOnLoadReviews.mockReturnValue(() => {
    return Promise.resolve();
  });

  const spyOnLeafletMap = jest.spyOn(leaflet, `map`);
  spyOnLeafletMap.mockReturnValue({
    setView: () => null,
    addLayer: () => null,
  });

  let tree = create(null);
  await act(async () => {
    tree = create(
        <MemoryRouter initialEntries={[`/offers/10`]}>
          <Route path="/offers/:id">
            <Provider store={store}>
              <Property />
            </Provider>
          </Route>
        </MemoryRouter>
    );
  });

  expect(tree.toJSON()).toMatchSnapshot();
});
