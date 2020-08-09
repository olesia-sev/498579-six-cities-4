import React from "react";
import renderer from "react-test-renderer";
import {FavouritesEmpty} from "./favourites-empty";

it(`FavouritesEmpty should be rendered`, () => {
  const tree = renderer
    .create(
        <FavouritesEmpty />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
