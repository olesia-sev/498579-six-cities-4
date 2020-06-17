import React from "react";
import {App} from "./app";
import renderer from "react-test-renderer";
import {testDataMain} from "../../utils/test.utils";

it(`App should be rendered`, () => {
  const tree = renderer
    .create(<App
      optionsAmount = {testDataMain.optionsAmount}
      cardTitles = {testDataMain.placeCardTitles}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
