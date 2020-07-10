import React from "react";
import renderer from "react-test-renderer";
import {FavouriteButton} from "./favourite-button";
import {favButtonTheme} from "../../../utils/test.utils";

it(`FavouriteButton should be rendered`, () => {
  const tree = renderer
    .create(
        <FavouriteButton
          theme={favButtonTheme}
          saved={true}
        />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
