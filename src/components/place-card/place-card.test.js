import React from "react";
import {PlaceCard} from "./place-card";
import renderer from "react-test-renderer";
import {cardDataArray, emptyFunction} from "../../utils/test.utils";

it(`PlaceCard should be rendered`, () => {
  const tree = renderer
    .create(<PlaceCard
      offer = {cardDataArray[0]}
      setActiveOffer={emptyFunction}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
