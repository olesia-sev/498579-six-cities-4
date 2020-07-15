import React from "react";
import renderer from "react-test-renderer";
import {MemoryRouter, Route} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Property from "./property";
import {cardDataArray} from "../../utils/test.utils";

const mockStore = configureStore([]);

it(`Property should be rendered`, () => {
  const store = mockStore({
    offers: cardDataArray,
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
