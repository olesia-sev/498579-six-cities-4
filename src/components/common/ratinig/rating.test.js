import React from "react";
import {Rating} from "./ratinig";
import renderer from "react-test-renderer";
import {ratingTheme, cardDataArray} from "../../../utils/test.utils";

it(`Rating should be rendered`, () => {
  const tree = renderer
    .create(
        <Rating
          theme={ratingTheme}
          rating={cardDataArray[0].rating}
        />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
