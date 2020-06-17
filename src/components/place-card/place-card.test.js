import React from "react";
import {PlaceCard} from "./place-card";
import renderer from "react-test-renderer";
import {testString, emptyFunction} from "../../utils/test.utils";

it(`PlaceCard should be rendered`, () => {
  const tree = renderer
    .create(<PlaceCard
      title = {testString}
      onCardTitleClick={emptyFunction}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
