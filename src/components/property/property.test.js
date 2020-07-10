import React from "react";
import renderer from "react-test-renderer";
import {MemoryRouter, Route} from "react-router-dom";
import {Property} from "./property";
import {cardDataArray} from "../../utils/test.utils";

it(`Property should be rendered`, () => {
  const tree = renderer
    .create(
        <MemoryRouter initialEntries={[`/offers/10`]}>
          <Route path="/offers/:id">
            <Property offers={cardDataArray} />
          </Route>
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
