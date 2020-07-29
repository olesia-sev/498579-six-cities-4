import React from "react";
import renderer from "react-test-renderer";
import {MemoryRouter, Route} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Property from "./property";
import {cardDataArray, citiesArray} from "../../utils/test.utils";
import {NameSpace} from "../../reducer/name-space";
import {SORT_TYPES} from "../../utils/functions";

const mockStore = configureStore([]);

it(`Property should be rendered`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      activeSortingType: SORT_TYPES.POPULAR,
    },
    [NameSpace.DATA]: {
      offers: cardDataArray,
      cities: citiesArray,
      activeCityId: citiesArray[0].id,
    },
  });

  const tree = renderer
    .create(
        <MemoryRouter initialEntries={[`/offers/10`]}>
          <Route path="/offers/:id">
            <Provider store={store}>
              <Property />
            </Provider>
          </Route>
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
