import React from "react";
import renderer from "react-test-renderer";
import {PlacesList} from "./places-list";
import {cardDataArray} from "../../utils/test.utils";

it(`Places list should be rendered`, () => {
  const tree = renderer
    .create(<PlacesList
      offers = {cardDataArray}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
