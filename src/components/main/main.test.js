import React from "react";
import {Main} from "./main";
import renderer from "react-test-renderer";
import {testDataMain} from "../../utils/test.utils";

it(`Card should have a title`, () => {
  const tree = renderer
    .create(<Main
      optionsAmount = {testDataMain.optionsAmount}
      cardTitles = {testDataMain.placeCardTitles}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
