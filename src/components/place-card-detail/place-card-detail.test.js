import React from "react";
import {PlaceCardDetail} from "./place-card-detail";
import renderer from "react-test-renderer";
import {cardDataArray} from "../../utils/test.utils";

it(`PlaceCardDetail should be rendered`, () => {
  const tree = renderer
    .create(<PlaceCardDetail
      offer = {cardDataArray[0]}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
