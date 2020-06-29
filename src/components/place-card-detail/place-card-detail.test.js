import React from "react";
import {PlaceCardDetail} from "./place-card-detail";
import renderer from "react-test-renderer";
import {cardDataArray} from "../../utils/test.utils";
import {MemoryRouter, Route} from "react-router-dom";

it(`PlaceCardDetail should be rendered`, () => {
  const tree = renderer
    .create(
        <MemoryRouter initialEntries={[`/offers/1`]}>
          <Route path="/offers/:id">
            <PlaceCardDetail offers={cardDataArray} />
          </Route>
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
