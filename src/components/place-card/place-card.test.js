import React from "react";
import {PlaceCard} from "./place-card";
import renderer from "react-test-renderer";

it(`PlaceCard should be rendered`, () => {
  const tree = renderer
    .create(<PlaceCard
      title = "Beautiful flat"
      onCardTitleClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
